const Channels = function() {
	// this is the list of message lists
	this.channel_list = [];
};

/**
 * get all channels in storage
 * @returns {item}
 */
Channels.prototype.getChannels = async function()
{
	const exp = new RegExp('/^ch_.+_Settings/');
	return await store.getDictionaryValues(exp);
};

Channels.prototype.addChannel = function(new_channel)
{
	let _list = this.getChannels();
	let item = _.find(_list, { name: new_channel });
	if ( ! _.isEmpty(item)) {
		logger.warn('channel already exists');
	}
	const channel = new MessageList();
	channel.name = new_channel;
	channel.saveSettings();

	_list.push(new_channel);
	this.setChannels(_list);
};

Channels.prototype.removeChannel = function(channel)
{
	let _list = this.getChannels();
	_list = _.pull(_list, channel);
	return _list;
};

Channels.prototype.retrieveMessages = async function()
{
	// get the list of messages
	const list = retrieveMessagesFromServer();

	list.every(async function(msg)
	{
		// find the list this belongs to
		const msg_list = _.find(this.channel_list, { 'recipient_user_id': user_id });

		msg.MessageList = msg_list;

		// decrypt
		msg.Body = msg_list.decryptMessage(msg.EncryptedBody);

		if (typeof msg_list.message_receive_event === "function") {
			msg_list.message_receive_event(msg);
		}

		// save (ok to be async)
		await this.saveMessage(msg);

		// mark as received (ok to be async)
		this.deleteReceivedMessage(msg.receipt_handle);
	});
};

Channels.prototype.retrieveMessagesFromServer = async function()
{
	logger.debug('Retrieving messages');

	const params = {
		QueueUrl: this.getUrl(current_user.user_id),
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
		let _list = [];
		result.data.Messages.forEach((qm)=>{
			let msg = new Message();
			msg.EncryptedBody = qm.Body;
			msg.MessageId = qm.MessageId;
			msg.ReceiptHandle = qm.ReceiptHandle;
			_list.push(msg);
		});
		return _list;
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