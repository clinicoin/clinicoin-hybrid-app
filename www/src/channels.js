const Channels = function() {
	// this is the list of message lists
	this.channel_list = [];

	this.getUrl = function(user){
		return 'https://sqs.'+AWS_REGION+'.amazonaws.com/'+AWS_ACCOUNT+'/Clinicoin-Mosio-'+user+'.fifo';
	};
};

/**
 * get all channels in storage
 * @returns {item}
 */
Channels.prototype.getChannels = async function()
{
	const self = this;
	logger.info('Retriving Channels');
	const exp = new RegExp('^ch_.+_Settings');
	const list = await store.getFilteredData(exp);
	let local_list = [];
	list.forEach(function (json) {
		let msglist = new MessageList();
		msglist.fromJSONString(json);
		local_list.push(msglist);
	});
	this.channel_list = local_list;
	return this.channel_list;
};

Channels.prototype.addChannel = async function(username)
{
	logger.info('Adding Channel '+username);
	let _list = await this.getChannels();
	let item = _.find(_list, { recipient_user_id: username });
	if ( ! _.isEmpty(item)) {
		logger.warn('channel already exists');
		return;
	}
	let channel = new MessageList();
	channel.friendly_name = username;
	channel.recipient_user_id = username;
	await channel.saveSettings();

	this.channel_list.push(channel);

	return channel;
};

Channels.prototype.checkForMessages = async function()
{
	// get the list of messages
	const list = await this.retrieveMessagesFromServer();

	if (list === false) {
		logger.debug('message retrieve returned false');
		return;
	}

	logger.debug(list);

	for (let msg of list) {
		const parts = _.split(msg.Body, '-----BEGIN PGP MESSAGE');

		const obj = JSON.parse(parts[0]);
		msg.Username = obj.Sender;
		msg.SentDate = obj.Sent;

		msg.Body = '';
		msg.EncryptedBody = '-----BEGIN PGP MESSAGE'+parts[1];


		// find the list this belongs to
		let msg_list = _.find(this.channel_list, { 'recipient_user_id': msg.Username });

		// create a msglist for those without one
		if (_.isEmpty(msg_list)) {
			msg_list = await this.addChannel(msg.Username);
		}

		msg.MessageList = msg_list;

		// decrypt
		const decrypted_obj = await this.decryptMessage(msg.EncryptedBody);

		msg.Body = decrypted_obj.data;

		if (decrypted_obj.signatures.length > 0 && decrypted_obj.signatures[0].valid) {
			logger.info("valid signature");
			msg.Signed = true;
		}

		msg.EncryptedBody = '';  // stripping off to reduce size

		if (typeof msg_list.message_receive_event === "function") {
			msg_list.message_receive_event(msg);
		}

		// save (ok to be async)
		await msg_list.saveMessage(msg);

		// mark as received (ok to be async)
		await this.deleteReceivedMessage(msg.ReceiptHandle);
	}

	return true;
};

Channels.prototype.retrieveMessagesFromServer = async function()
{
	logger.debug('Retrieving messages');

	const queue_url = this.getUrl(current_user.user_id);
	logger.debug('URL = '+queue_url);

	const params = {
		QueueUrl: queue_url,
		MaxNumberOfMessages: 10,
		VisibilityTimeout: 30,
		WaitTimeSeconds: 5
	};

	const sqs = new AWS.SQS({apiVersion: '2012-11-05', region:AWS_REGION});

	const retrieve_promise = new Promise((resolve) => {
		sqs.receiveMessage(params, function(error, data) {
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
		return false;
	}
	else {
		logger.info('message receive success');

		// parse the incoming list
		let list = [];
		result.data.Messages.forEach((qm)=>{
			let msg = new Message();
			msg.Body = qm.Body;
			msg.MessageId = qm.MessageId;
			msg.ReceiptHandle = qm.ReceiptHandle;
			list.push(msg);
		});

		if (list.length > 0) {
			logger.debug(list.length + " messages retrieved");
		}

		return list;
	}
};

Channels.prototype.deleteReceivedMessage = async function(receipt_handle)
{
	logger.debug('Deleting message: '+receipt_handle);

	const params = {
		QueueUrl: this.getUrl(current_user.user_id),
		ReceiptHandle: receipt_handle
	};

	const sqs = new AWS.SQS({apiVersion: '2012-11-05', region:AWS_REGION});

	const delete_promise = new Promise((resolve) => {
		sqs.deleteMessage(params, function(error, data) {
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
		return false;
	}
	else {
		logger.info('message delete success');
		return true;
	}
};

// request an encrypted string to decrypt
Channels.prototype.decryptMessage = async function(encrypted_data)
{
	logger.info('Decrypting message');

	if (_.isEmpty(encrypted_data)) {
		logger.error('nothing to decrypt');
		return false;
	}

	if (_.isEmpty(current_user.getPrivateKey())) {
		logger.error('no private key');
		return false;
	}

	let privKeyObj = openpgp.key.readArmored(current_user.getPrivateKey()).keys[0];
	privKeyObj.decrypt(current_user.getPassphrase());

	//logger.debug(encrypted_data);

	let options = {
		message: openpgp.message.readArmored(encrypted_data),     // parse armored message
		privateKey: privKeyObj // for decryption
	};

	// only check for signing if we have key
	if (_.isEmpty(this.recipient_public_key)) {
		options.publicKeys = openpgp.key.readArmored(this.recipient_public_key).keys;
	}

	// returns object formatted with properties of data:string and signatures:[].valid
	const decrypted_obj = await openpgp.decrypt(options);

	logger.info("data decrypted");

	return decrypted_obj;
};


let channels = new Channels();