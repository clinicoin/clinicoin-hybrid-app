function MessageList()
{
	this.friendly_name = '';
	this.recipient_user_id = '';
	this.recipient_public_key = '';
	this.message_group_id = '1';
	this.messages = [];
	this.message_receive_event = null;

	this.getUrl = function(user){
		return 'https://sqs.'+AWS_REGION+'.amazonaws.com/'+AWS_ACCOUNT+'/Clinicoin-Mosio-'+user+'.fifo';
	};

	this.toJSON = function()
	{
		return JSON.stringify({
			friendly_name: this.friendly_name,
			recipient_user_id: this.recipient_user_id,
			recipient_public_key: this.recipient_public_key,
			message_group_id: this.message_group_id,
		});
	};

	this.fromJSONString = function(json_string)
	{
		if (_.isEmpty(json_string)) {
			return;
		}
		const data = JSON.parse(json_string);
		this.friendly_name = data.friendly_name;
		this.recipient_user_id = data.recipient_user_id;
		this.recipient_public_key = data.recipient_public_key;
		this.message_group_id = data.message_group_id;
	};
}

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
	if (_.isEmpty(data)) {
		logger.error('nothing to send');
		return false;
	}

	if (_.isEmpty(this.recipient_user_id)) {
		logger.error('no destination user');
		return false;
	}

	const d = new Date();

	let queue_url = this.getUrl(this.recipient_user_id);

	const params = {
		MessageBody: data,
		QueueUrl: queue_url,
		DelaySeconds: 0,
		MessageDeduplicationId: d.getTime().toString(),
		MessageGroupId: this.message_group_id
	};

	const sqs = new AWS.SQS({apiVersion: '2012-11-05', region:AWS_REGION});

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
	// we should receive a message object

	this.message.push(message);

	// get the recipient's public key
	await this.getRecipientPublicKey();

	// encrypt the message, sending signed
	const encrypted_data = await this.encryptMessage(message, true);

	// send it to the server
	await this.sendToServer(encrypted_data);

	// save to list
	await this.saveMessage(message);
};

// request an encrypted string to decrypt
MessageList.prototype.decryptMessage = async function(encrypted_data)
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

	if (decrypted_obj.signatures.length > 0 && decrypted_obj.signatures[0].valid) {
		logger.info("valid signature");
	}

	return decrypted_obj;
};

MessageList.prototype.removeAllMessages = async function()
{
	const exp = new RegExp('^ch_'+this.recipient_user_id+'_\d+');
	await store.removeItemsExpression(exp);
};

MessageList.prototype.loadMessages = async function()
{
	logger.info('loading messages');

	const self = this;
	this.messages = [];
	const exp = new RegExp('^ch_'+this.recipient_user_id+'_\\d+');
	const key_list = await store.getFilteredData(exp);
	key_list.forEach(async function(json) {
		const msg = new Message();
		msg.fromJSONString(json, self);
		logger.debug("loading msg "+msg.MessageId);
	 	self.messages.push(msg);
	});

	return true;
};

MessageList.prototype.saveMessage = async function(msg)
{
	logger.info('save message '+msg.MessageId);
	await store.setItem('ch_' + this.recipient_user_id + '_' + msg.ReceiveDate, msg.toJSON());
	return true;
};

MessageList.prototype.loadSettings = async function()
{
	const settings = await store.getItem('ch_'+this.recipient_user_id+'_Settings');
	this.fromJSONString(settings);
	return true;
};

MessageList.prototype.saveSettings = async function()
{
	await store.setItem('ch_'+this.recipient_user_id+'_Settings', this.toJSON());
	return true;
};