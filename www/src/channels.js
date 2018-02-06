const Channels = function() {
	// this is the list of message lists
	this.channel_list = [];

	this.getUrl = function(user){
		return 'https://sqs.'+AWS_REGION+'.amazonaws.com/'+AWS_ACCOUNT+'/Clinicoin-Mosio-'+user+'.fifo';
	};
};

Channels.prototype.newChannelEventDelegate = null;

Channels.prototype.newMessageEventDelegate = null;

/**
 * get all channels in storage
 * @returns {item}
 */
Channels.prototype.getChannels = async function()
{
	logger.info('Retriving Individual Channels');

	let list = await store.getFilteredData(new RegExp('^ch_'+current_user.username+'_.+_Settings'));

	let local_list = [];

	for (let json of list) {
		let msglist = new MessageList();
		msglist.fromJSONString(json);
		await msglist.loadMessages();
		local_list.push(msglist);
	}

	logger.info('Retriving Group Channels');

	list = await store.getFilteredData(new RegExp('^gr_'+current_user.username+'_.+_Settings'));

	for (let json of list) {
		let grp = new Group();
		grp.fromGroupJSONString(json);
		grp.loadSettings();
		await grp.loadMessages();
		local_list.push(grp);
	}

	this.channel_list = local_list;

	return this.channel_list;
};

Channels.prototype.addChannel = async function(name)
{
	logger.info('Adding Channel '+name);
	let _list = await this.getChannels();
	let item = _.find(_list, { recipient_user_id: name });
	if ( ! _.isEmpty(item)) {
		logger.warn('channel already exists');
		return;
	}

	let channel = new MessageList();
	channel.friendly_name = name;
	channel.recipient_user_id = name;
	await channel.saveSettings();

	this.channel_list.push(channel);

	if (this.newChannelEventDelegate != null && typeof this.newChannelEventDelegate === "function") {
		this.newChannelEventDelegate(channel);
	}

	return channel;
};

Channels.prototype.addGroupChannel = function(new_group)
{
	logger.info('Adding new group: '+new_group.group_name);

	if (_.indexOf(this.channel_list, new_group) === -1) {
		this.channel_list.push(new_group);
	}

	if (this.newChannelEventDelegate != null && typeof this.newChannelEventDelegate === "function") {
		this.newChannelEventDelegate(new_group);
	}
};

Channels.prototype.checkAllMessageSources = async function()
{
	this.checkForMessages(null, false);

	const group_list = _.filter(this.channel_list, { is_group: true });

	for(let group_obj of group_list) {
		if ( ! _.isEmpty(group_obj.group_private_key)) {
			this.checkForMessages(group_obj.group_name, true);
		}
	}
};

Channels.prototype.checkForMessages = async function(user_or_group, is_group)
{
	let private_key_obj = null;
	let check_name = '';

	if (_.isEmpty(user_or_group)) {
		is_group = false;
		check_name = current_user.username;
	}
	else if (user_or_group.constructor === User) {
		is_group = false;
		check_name = user_or_group.username;
		private_key_obj = openpgp.key.readArmored(user_or_group.getPrivateKey()).keys[0];
		private_key_obj.decrypt(user_or_group.getPassphrase());
	}
	else if (user_or_group.constructor === Group) {
		check_name = user_or_group.group_name;
		private_key_obj = openpgp.key.readArmored(user_or_group.group_private_key).keys[0];
		private_key_obj.decrypt(user_or_group.group_passphrase);
	}

	let list = await this.listServerMessages(check_name);
	list = list.sort();

	if (list === false) {
		logger.debug('No messages for '+check_name);
		return;
	}

	logger.debug(list);

	for (let result_obj of list) {
		let msg = await this.retrieveMessage(result_obj.Key);

		let decrypt_success = await msg.decryptMessage(this, private_key_obj);

		if ( ! is_group && ! decrypt_success) {
			// delete personal messages that fail decryption
			await this.deleteMessage(result_obj.Key);  // leave sync only for testing
		}
		else if (this.newMessageEventDelegate != null && typeof this.newMessageEventDelegate === "function") {
			this.newMessageEventDelegate(msg_list, msg);
		}
	}

	return true;
};

Channels.prototype.findByUsername = function(username)
{
	return _.find(this.channel_list, { 'recipient_user_id': username });
};

Channels.prototype.listServerMessages = async function(path)
{
	logger.debug('Retrieving list');

	const last_message_key = await store.getItem(path+'_LastMessage', null);
	logger.debug('Since key: '+last_message_key);

	let params = {
		Bucket: 'clinicoin-users',
		Prefix: path+'/'
	};

	if ( ! _.isEmpty(last_message_key)) {
		params.StartAfter = last_message_key;
	}

	const s3 = new AWS.S3({apiVersion: '2006-03-01'});

	const retrieve_promise = new Promise((resolve) => {
		s3.listObjectsV2(params, function(error, data) {
			if (error) {
				resolve({error:error});
			} else {
				resolve({data:data});
			}
		});
	});

	const result = await retrieve_promise;

	if (result.error) {
		logger.error(result.error.code + " - " + result.error.message);
		this.last_error_code = result.error.code;
		this.last_error_message = result.error.message;

		// if it failed for credentials, try logging in for next time
		if (result.error.code === 'CredentialsError') {
			current_user.login();
		}

		return [];
	}
	else {
		logger.info('message receive success');

		return result.data.Contents;
	}
};

Channels.prototype.retrieveMessage = async function(message_key)
{
	logger.debug('Retrieving message '+message_key);

	const params = {
		Bucket: 'clinicoin-users',
		Key: message_key
	};

	const s3 = new AWS.S3({apiVersion: '2006-03-01'});

	const retrieve_promise = new Promise((resolve) => {
		s3.getObject(params, function(error, data) {
			if (error) {
				resolve({error:error});
			} else {
				resolve({data:data});
			}
		});
	});

	const result = await retrieve_promise;
	if (result.error) {
		logger.error(result.error.code + " - " + result.error.message);
		this.last_error_code = result.error.code;
		this.last_error_message = result.error.message;

		// if it failed for credentials, try logging in for next time
		if (result.error.code === 'CredentialsError') {
			current_user.login();
		}

		return false;
	}
	else {
		let msg = new Message();

		// parse the id out
		let myregexp = /(.+)\/msg_(\d+)/i;
		if (myregexp.test(message_key)) {
			const match = myregexp.exec(message_key);
			const path = match[1];
			msg.MessageId = match[2];
			store.setItem(path+'_LastMessage', null);
		}
		else {
			myregexp = /(.+)\/cmd_(\d+)/i;
			if (myregexp.test(message_key)) {
				const match = myregexp.exec(message_key);
				const path = match[1];
				msg.MessageId = match[2];
				store.setItem(path+'_LastMessage', null);
			}
		}

		msg.MessagePath = message_key;
		msg.EncryptedBody = result.data.Body.toString();
		msg.SendStatus = 'Received';
		return msg;
	}
};

Channels.prototype.deleteMessage = async function(message_key)
{
	logger.debug('Delete message '+message_key);

	const params = {
		Bucket: 'clinicoin-users',
		Key: message_key
	};

	const s3 = new AWS.S3({apiVersion: '2006-03-01'});

	const delete_promise = new Promise((resolve) => {
		s3.deleteObject(params, function(error, data) {
			if (error) {
				resolve({error:error});
			} else {
				resolve({data:data});
			}
		});
	});

	const result = await delete_promise;
	if (result.error) {
		logger.error(result.error.code + " - " + result.error.message);
		this.last_error_code = result.error.code;
		this.last_error_message = result.error.message;

		// if it failed for credentials, try logging in for next time
		if (result.error.code === 'CredentialsError') {
			current_user.login();
		}

		return false;
	}

	return true;
};

let channels = new Channels();