
function Message() {
	this.Sender = 'me';
	this.Body = '';
	this.EncryptedBody = '';
	this.Signed = false;
	this.MessageId = moment().format('x');
	this.ReceiptHandle = '';
	this.ReceiveDate =  moment('1999-01-01');
	this.SentDate = moment('1999-01-01');
	this.SendStatus = 'Unsent';
	this.ReadDate = moment('1999-01-01');
	this.GroupMessageType = null;
	this.MessageList = null;
	this.Command = null;
	this.AwsKey = '';

	this.toJSON = function()
	{
		return JSON.stringify({
			Username: this.Username,
			Sender: this.Sender,
			Body: this.Body,
			Signed: this.Signed,
			MessageId: this.MessageId,
			ReceiveDate: moment(this.ReceiveDate).format('YYYY-MM-DD HH:mm:ss'),
			SentDate: moment(this.SentDate).format('YYYY-MM-DD HH:mm:ss'),
			ReadDate: moment(this.ReadDate).format('YYYY-MM-DD HH:mm:ss'),
			SendStatus: this.SendStatus,
			GroupMessageType: this.GroupMessageType,
			AwsKey: this.AwsKey,
			Command: this.Command
		});
	};

	this.fromJSONString = function(json_string) {
		const data = JSON.parse(json_string);
		this.Username = data.Username;
		this.Sender = data.Sender;
		this.Body = data.Body;
		this.Signed = data.Signed;
		this.MessageId = data.MessageId;
		this.ReceiveDate = moment(data.ReceiveDate);
		this.SentDate = moment(data.SentDate);
		this.ReadDate = data.ReadDate;
		this.SendStatus = data.SendStatus;
		this.GroupMessageType = data.GroupMessageType;
		this.AwsKey = data.AwsKey;
		this.Command = data.Command;
	};

	this.getEnvelope = function()
	{
		return JSON.stringify({
			Sender: this.Sender,
			Receiver: this.Receiver,
			Sent: moment().toISOString(),
			GroupMessageType: this.GroupMessageType
		});
	};

	this.readEnvelope = function(json_string)
	{
		const data = JSON.parse(json_string);
		this.Sender = data.Sender;
		this.Receiver = data.Receiver;
		this.SentDate = data.Sent;
		this.GroupMessageType = data.GroupMessageType;
	};

	this.isRead = function()
	{
		return moment(this.ReadDate).format('YYYY-MM-DD') !== moment('1999-01-01').format('YYYY-MM-DD');
	};

	this.getFriendlyTime = function()
	{
		return moment(this.SentDate).fromNow();
	}
}

// request an encrypted string to decrypt
Message.prototype.decryptMessage = async function(channels, private_key_obj)
{
	logger.info('Decrypting message');

	if (_.isEmpty(this.EncryptedBody)) {
		logger.error('nothing to decrypt');
		return false;
	}

	if (_.isEmpty(private_key_obj) && ! _.isEmpty(current_user.getPrivateKey())) {
		private_key_obj = openpgp.key.readArmored(current_user.getPrivateKey()).keys[0];
		private_key_obj.decrypt(current_user.getPassphrase());
	}

	if (_.isEmpty(private_key_obj)) {
		logger.error('no private key');
		return false;
	}

	//logger.debug(encrypted_data);

	// returns object formatted with properties of data:string and signatures:[].valid
	let decrypted_obj = null;
	try {
		let options = {
			message: openpgp.message.readArmored(this.EncryptedBody),     // parse armored message
			privateKey: private_key_obj // for decryption
		};

		decrypted_obj = await openpgp.decrypt(options);
	} catch(e) {
		logger.error(e.message);
		return false;
	}

	const parts = _.split(decrypted_obj.data, '----END ENVELOPE----');
	const envelope = _.replace(parts[0],'----START ENVELOPE----','').trim();
	this.readEnvelope(envelope);
	logger.debug(envelope);

	this.Body = parts[1].trim();

	logger.info("data decrypted");

	// try to find this in the groups, if the receiver is not the current user
	if (this.Receiver !== current_user.username) {
		this.MessageList = channels.findByUsername(this.Receiver);
		if (_.isEmpty(this.MessageList) || this.MessageList.constructor !== Group) {
			this.MessageList = null;
		}
	}

	// find the list this belongs to
	if (this.MessageList === null) {
		this.MessageList = channels.findByUsername(this.Sender);

		// create a msglist for those without one
		if (_.isEmpty(this.MessageList)) {
			this.MessageList = await channels.addChannel(this.Sender);
		}
	}

	if ( ! _.isEmpty(this.MessageList)) {
		await this.MessageList.processMessage(this);
	}

	return true;
};

Message.prototype.encryptMessage = async function(recipient_public, signer_keys)
{
	if (_.isEmpty(this.Body)) {
		logger.error('nothing to encrypt');
		return false;
	}

	if (_.isEmpty(recipient_public)) {
		logger.error('no destination public key');
		return false;
	}

	let options = {
		data: "----START ENVELOPE----\n\n"
				+ this.getEnvelope()
				+ "\n\n----END ENVELOPE----\n\n"
				+ this.Body,
		publicKeys: openpgp.key.readArmored(recipient_public).keys,
	};

	if ( ! _.isEmpty(signer_keys)) {
		options.privateKeys = signer_keys;
	}

	const enc_object = await openpgp.encrypt(options);
	this.EncryptedBody = enc_object.data;
};

Message.prototype.deleteFromServer = async function(aws_key)
{
	if (_.isEmpty(aws_key)) {
		aws_key = this.AwsKey;
	}

	logger.debug('Delete message '+aws_key);

	const params = {
		Bucket: 'clinicoin-users',
		Key: aws_key
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