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
		grp.fromJSONString(json);
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

Channels.prototype.checkForMessages = async function(user_or_group_name)
{
	if (_.isEmpty(user_or_group_name)) {
		user_or_group_name = current_user.username;
	}

	// get the list of messages
	const list = await this.listServerMessages(user_or_group_name);

	if (list === false) {
		logger.debug('message retrieve returned false');
		return;
	}

	logger.debug(list);

	for (let result_obj of list) {
		let msg = await this.retrieveMessage(result_obj.Key);

		// processing as a normal message
		await msg.decryptMessage(this);

		if (this.newMessageEventDelegate != null && typeof this.newMessageEventDelegate === "function") {
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

		return false;
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
		const myregexp = /\/msg_(\d+)/i;
		const match = myregexp.exec(message_key);
		msg.MessageId = match[1];

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