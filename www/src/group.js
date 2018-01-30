
class Group extends MessageList
{
	async constructor()
	{
		super();

		this.friendly_name = '';
		this.group_name = '';
		this.user_list = [];
		this.group_passphrase = '';
		this.group_private_key = '';
		this.group_public_key = '';
		this.group_status = '';
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
		this.group_status = data.group_status
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

	async createGroup(group_name)
	{
		logger.info('calling createGroup');

		if (_.isEmpty(group_name.trim())) {
			logger.error("group name is empty");
			return false;
		}

		const options = {
			userIds: [ {
				name: this.group_name
			} ], // multiple user IDs
			numBits: 2048,                // RSA key size
			passphrase: this.group_passphrase        // protects the private key
		};

		const key_object = await openpgp.generateKey(options);
		this.group_private_key = key_object.privateKeyArmored;
		this.group_public_key = key_object.publicKeyArmored;

		this.saveSettings();

		const payload = JSON.stringify({
			username: this.group_name,
			publicKey: this.group_public_key,
			is_group: 1
		});

		const result = await this.callLambda({
			FunctionName : 'Clinicoin-updatePublicKey',
			InvocationType : 'RequestResponse',
			Payload: payload,
			LogType : 'None'
		});

		return result.statusCode === 200;
	};

	async joinGroup(group_name)
	{
		logger.info('calling joinGroup');

		if (_.isEmpty(group_name.trim())) {
			logger.error("group name is empty");
			return false;
		}

		let msg = new Message();
		msg.Body = message_data;
		msg.Sender = current_user.username;
		msg.Receiver = group_name;

		this.recipient_user_id = group_name;
		await this.getRecipientPublicKey();
		this.group_public_key = recipient_public_key;

		await msg.encryptMessage(this.recipient_public_key, []);

		// send it to the server
		const send_success = await this.sendToServer(msg.EncryptedBody);

		this.group_status = 'requested';

		this.saveSettings();
	}

	async sendMemberMessage(message_json)
	{
		let msg = new Message();
		msg.Body = message_json;
		msg.Sender = group_name;
		msg.Receiver = user_name;

		this.recipient_user_id = group_name;
		await this.getRecipientPublicKey();
		this.group_public_key = recipient_public_key;

		let private_key_obj = openpgp.key.readArmored(this.group_private_key).keys[0];
		private_key_obj.decrypt(this.group_passphrase);

		await msg.encryptMessage(this.recipient_public_key, [private_key_obj]);

		// send it to the server
		const send_success = await this.sendToServer(msg.EncryptedBody);
	}

	async approveJoin(user_name)
	{
		const msg = { status: "approved", passphrase: this.group_passphrase, privatekey: this.group_private_key };
		this.sendMemberMessage(msg);
	}

	async removeMember(user_name)
	{
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