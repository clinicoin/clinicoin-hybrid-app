// this is the list of message lists
let Channel_List = [];


function MessageList()
{
	this.recipient_user_id = '';
	this.recipient_public_key = '';
	this.message_group_id = 1;
}

MessageList.prototype.current_user = null;

MessageList.prototype.getRecipientPublicKey = async function()
{
	logger.info('calling getRecipientPublicKey');

	if (_.isEmpty(this.recipient_user_id)) {
		logger.error('recipient username is blank');
		return false;
	}

	const response = await current_user.callLambda({
		FunctionName : 'cloud9-Clinicoin-getPublicKey-129CYBDDJRHIG',
		InvocationType : 'RequestResponse',
		Payload: JSON.stringify({username: this.recipient_user_id}),
		LogType : 'None'
	});

	if ( ! _.isEmpty(response.body)) {
		this.recipient_public_key = response.body.PublicKey.S;
		return response.statusCode === 200;
	}

	return false;
};

MessageList.prototype.encryptMessage = async function(data_to_encrypt, signed)
{
	if (_.isEmpty(data_to_encrypt)) {
		logger.error('nothing to encrypt');
		return false;
	}

	if (_.isEmpty(this.recipient_public_key)) {
		logger.error('no destination public key');
		return false;
	}

	let options = {
		data: data_to_encrypt,    // input as String (or Uint8Array)
		publicKeys: openpgp.key.readArmored(this.recipient_public_key).keys,
	};

	if (signed) {
		let privKeyObj = openpgp.key.readArmored(current_user.getPrivateKey()).keys[0];
		privKeyObj.decrypt(current_user.getPassphrase());
		options.privateKeys = privKeyObj;
	}

	const encrypt_promise = await openpgp.encrypt(options);

	return encrypt_promise.data;
};

MessageList.prototype.sendToServer = async function(data)
{
	const d = new Date();

	const params = {
		MessageBody: data, /* required */
		QueueUrl: this.recipient_user_id, /* required */
		DelaySeconds: 0,
		MessageDeduplicationId: d.getTime(),
		MessageGroupId: this.message_group_id
	};

	const send_promise = new Promise((resolve) => {
		sqs.sendMessage(params, function(error, data) {
			if (error) {
				resolve({error:error});
			} else {
				resolve({data:data});
			}
		});
	});

	const result = await send_promise;
	if (result.error) {
		logger.error(result.error.code + " - " + result.error.message);
		this.last_error_code = result.error.code;
		this.last_error_message = result.error.message;
		return false;
	}
	else {
		logger.info('message send success');
		return true;
	}
};

MessageList.prototype.sendMessage = async function(message)
{
	// get the recipient's public key
	await this.getRecipientPublicKey();

	// encrypt the message, sending signed
	const encrypted_data = await this.encryptMessage(message, true);

	// send it to the server
	await this.sendToServer(encrypted_data);

	// save to list
};

const retrieveMessages = async function()
{
	// get the list of messages
	const list = retrieveMessagesFromServer();

	list.every(element => {
		// mark as received
		deleteReceivedMessage(element.receipt_handle);

		// find the list this belongs to
		const msg_list = _.find(Channel_List, { 'recipient_user_id': user_id });

		// decrypt
		const plaintext = msg_list.decryptMessage(element.body);

		// save message = encrypting message and appending it to some file
	});
};

const retrieveMessagesFromServer = async function()
{
	logger.debug('Retrieving messages');

	var params = {
		QueueUrl: current_user.user_id,
		AttributeNames: [ FifoQueue | ContentBasedDeduplication ],
		MaxNumberOfMessages: 10,
		VisibilityTimeout: 30,
		WaitTimeSeconds: 5
	};

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
		logger.info('message delete success');
		return result.data;
	}
};

const deleteReceivedMessage = async function(receipt_handle)
{
	logger.debug('Deleting message: '+receipt_handle);

	var params = {
		QueueUrl: current_user.user_id,
		ReceiptHandle: receipt_handle
	};

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
MessageList.prototype.decryptMessage = async function(encrypted_data)
{
	var privKeyObj = openpgp.key.readArmored(current_user.getPrivateKey()).keys[0];
	privKeyObj.decrypt(current_user.getPassphrase());

	options = {
		message: openpgp.message.readArmored(encrypted_data),     // parse armored message
		publicKeys: openpgp.key.readArmored(this.recipient_public_key).keys,    // for verification (optional)
		privateKey: privKeyObj // for decryption
	};

	const plaintext = await openpgp.decrypt(options);
};
