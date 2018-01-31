
class Group extends MessageList
{
	constructor()
	{
		super();

		this.friendly_name = '';
		this.group_name = '';
		this.admin_list = [];
		this.user_list = [];
		this.group_passphrase = '';
		this.group_private_key = '';
		this.group_public_key = '';
		this.group_status = '';
		this.group_type = 'open';
		this.last_error = '';
	}

	toJSON()
	{
		return JSON.stringify({
			friendly_name: this.friendly_name,
			group_name: this.group_name,
			group_passphrase: this.group_passphrase,
			group_private_key: this.group_private_key,
			group_public_key: this.group_public_key,
			group_status: this.group_status,
			group_type: this.group_type,
			is_group: true
		});
	};

	fromJSONString(json_string)
	{
		if (_.isEmpty(json_string)) {
			return;
		}
		const data = JSON.parse(json_string);
		this.friendly_name = data.friendly_name;
		this.recipient_user_id = data.group_name;
		this.group_passphrase = data.group_passphrase;
		this.group_private_key = data.group_private_key;
		this.group_public_key = data.group_public_key;
		this.group_status = data.group_status;
		this.group_type = data.group_type;
		this.is_group = true;
	};

	async loadSettings()
	{
		const settings = await store.getItem('gr_'+current_user.username+'_'+this.group_name+'_Settings');
		this.fromJSONString(settings);

		const admin_json = await store.getItem('gr_'+current_user.username+'_'+this.group_name+'_Admins');
		this.admin_list = JSON.parse(admin_json);

		const user_json = await store.getItem('gr_'+current_user.username+'_'+this.group_name+'_Users');
		this.user_list = JSON.parse(user_json);

		return true;
	};

	async saveSettings()
	{
		await store.setItem('gr_'+current_user.username+'_'+this.group_name+'_Settings', this.toJSON());

		await store.setItem('gr_'+current_user.username+'_'+this.group_name+'_Admins', JSON.stringify(this.admin_list));

		await store.setItem('gr_'+current_user.username+'_'+this.group_name+'_Users', JSON.stringify(this.user_list));

		return true;
	};

	async processIncoming(msg)
	{
		const decrypted_obj = await this.decryptMessage(msg.EncryptedBody);

		msg.Body = decrypted_obj.data;

		if (decrypted_obj.signatures.length > 0 && decrypted_obj.signatures[0].valid) {
			logger.info("valid signature");
			msg.Signed = true;
		}

		if (_.isEmpty(msg.MessageType)) {
			this.messages.push(msg);
			await msg_list.saveMessage(msg);
		}


		/*
		TODO: functions for invite, request access, join (free group), refuse access, grant access
		 */
	};

	static async createGroup(group_name, group_type)
	{
		logger.info('calling createGroup');

		if (_.isEmpty(group_name) || _.isEmpty(group_name.trim())) {
			logger.error("group name is empty");
			return "group name is empty";
		}

		if (group_name.replace(/\W+/ig, "") !== group_name) {
			logger.error('group name contains non-word characters');
			return 'group name contains non-word characters';
		}

		if (channels.findByUsername(group_name)) {
			logger.error('group name exists locally');
			return 'group name exists locally';
		}

		// check if the group already exists
		let group = new Group();
		group.group_name = group_name;
		group.group_type = group_type;
		group.recipient_user_id = group_name;
		const exists = await group.getRecipientPublicKey();

		if (exists) {
			logger.error("group with that name already exists");
			return "group with that name already exists";
		}

		// good to go, create keys and save
		group.group_passphrase = Group.randomPassword(30);

		const options = {
			userIds: [ {
				name: group_name
			} ], // multiple user IDs
			numBits: 2048,                // RSA key size
			passphrase: group.group_passphrase        // protects the private key
		};

		const key_object = await openpgp.generateKey(options);
		group.group_private_key = key_object.privateKeyArmored;
		group.group_public_key = key_object.publicKeyArmored;

		const payload = JSON.stringify({
			username: group.group_name,
			publicKey: group.group_public_key,
			is_group: "1",
			sub: group.group_type,
			phone: ' ',
			email: current_user.username
		});

		const result = await current_user.callLambda({
			FunctionName : 'Clinicoin-updatePublicKey',
			InvocationType : 'RequestResponse',
			Payload: payload,
			LogType : 'None'
		});

		if (result.statusCode !== 200) {
			logger.error("Unknown error setting public key");
			return "Unknown error setting public key";
		}

		group.admin_list.push(current_user.username);

		group.saveSettings();

		channels.addGroupChannel(group);

		return group;
	};

	static randomPassword(length) {
		const chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
		let pass = "";
		for (let x = 0; x < length; x++) {
			let i = Math.floor(Math.random() * chars.length);
			pass += chars.charAt(i);
		}
		return pass;
	}

	async getGroupKey()
	{
		logger.info('calling joinGroup');

		if (_.isEmpty(this.group_name.trim())) {
			logger.error("group name is empty");
			return false;
		}
		this.recipient_user_id = this.group_name;
		const result = await this.getRecipientPublicKey();
		this.group_public_key = this.recipient_public_key;
		return result;
	};

	async sendMemberMessage(message_json)
	{
		let msg = new Message();
		msg.Body = message_json;
		msg.Sender = current_user.username;
		msg.Receiver = this.group_name;

		this.recipient_user_id = this.group_name;
		await this.getRecipientPublicKey();
		this.group_public_key = this.recipient_public_key;

		if ( ! _.isEmpty(this.group_private_key)) {
			let private_key_obj = openpgp.key.readArmored(this.group_private_key).keys[0];
			private_key_obj.decrypt(this.group_passphrase);
			await msg.encryptMessage(this.recipient_public_key, [private_key_obj]);
		}
		else {
			await msg.encryptMessage(this.recipient_public_key);
		}

		// send it to the server
		const send_success = await this.sendToServer(msg.EncryptedBody, 'cmd');
	}

	async joinGroup(group_name)
	{
		logger.info('calling joinGroup');

		if (_.isEmpty(group_name) || _.isEmpty(group_name.trim())) {
			logger.error("group name is empty");
			return 'group name is empty';
		}

		if (channels.findByUsername(group_name)) {
			logger.error('group name exists locally');
			return 'group name exists locally';
		}

		this.recipient_user_id = group_name;
		const exists = await this.getRecipientPublicKey();

		if ( ! exists) {
			logger.error("group with that name does not exist");
			return "group not found";
		}

		this.group_public_key = this.recipient_public_key;
		this.group_name = group_name;

		const msg = { command: "join "+group_name };
		await this.sendMemberMessage(msg);

		this.group_status = 'requested';

		this.saveSettings();

		channels.addGroupChannel(this);
	}

	async approveJoin(user_name)
	{
		logger.info('approving join');
		this.user_list.push(user_name);
		const msg = {
			status: "approved",
			passphrase: this.group_passphrase,
			privatekey: this.group_private_key,
			admins: this.admin_list,
			users: this.user_list
		};
		this.sendMemberMessage(msg);
		this.saveSettings();
	}

	receiveApproval(msg)
	{
		this.group_status = msg.status;
		this.group_passphrase = msg.passphrase;
		this.group_private_key = msg.privatekey;
		this.admin_list = msg.admins;
		this.user_list = msg.users;
		this.saveSettings();
	};

	async removeMember(user_name)
	{
		logger.info('removing member');

		this.user_list = _.without(this.user_list, user_name);
		this.saveSettings();

		const msg = { status: "removed" };
		this.sendMemberMessage(msg);

		const key_object = await openpgp.generateKey(options);
		this.group_private_key = key_object.privateKeyArmored;
		this.group_public_key = key_object.publicKeyArmored;

		this.saveSettings();

		this.distributeKey();
	}

	async distributeKey()
	{
		logger.info('calling distributeKey');

		if (_.isEmpty(this.group_private_key)) {
			logger.error('private key is blank');
			return false;
		}

		if (_.isEmpty(this.group_public_key)) {
			logger.error('public key is blank');
			return false;
		}

		const payload = JSON.stringify({
			group: this.group_name,
			publicKey: this.group_public_key,
			privateKey: this.group_private_key,
			passphrase: this.group_passphrase,
			users: this.user_list
		});

		const result = await current_user.callLambda({
			FunctionName : 'Clinicoin-bulkSend',
			InvocationType : 'RequestResponse',
			Payload: payload,
			LogType : 'None'
		});

		return result.statusCode === 200;
	}

}