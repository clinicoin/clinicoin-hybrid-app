
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
			GroupMessageType: this.GroupMessageType
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

	let options = {
		message: openpgp.message.readArmored(this.EncryptedBody),     // parse armored message
		privateKey: private_key_obj // for decryption
	};

	// returns object formatted with properties of data:string and signatures:[].valid
	const decrypted_obj = await openpgp.decrypt(options);

	const parts = _.split(decrypted_obj.data, '----END ENVELOPE----');
	const envelope = _.replace(parts[0],'----START ENVELOPE----','').trim();
	this.readEnvelope(envelope);
	logger.debug(envelope);

	this.Body = parts[1].trim();

	logger.info("data decrypted");

	// find the list this belongs to
	this.MessageList = channels.findByUsername(this.Sender);

	// create a msglist for those without one
	if (_.isEmpty(this.MessageList)) {
		this.MessageList = await channels.addChannel(this.Sender);
	}

	if ( ! _.isEmpty(this.MessageList)) {
		this.MessageList.messages.push(this);
		await this.MessageList.saveMessage(this);

		// only check for signing if we have key
		let verified = null;
		if (!_.isEmpty(this.MessageList.recipient_public_key)) {
			let options = {
				message: openpgp.cleartext.readArmored(this.EncryptedBody), // parse armored message
				publicKeys: openpgp.key.readArmored(this.MessageList.recipient_public_key).keys   // for verification
			};
			verified = await openpgp.verify(options);

			if (verified.signatures.length > 0 && verified.signatures[0].valid) {
				logger.info("valid signature");
				this.Signed = true;
			}
		}
	}
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

		/*
		let privKeyObj = openpgp.key.readArmored(private_key).keys[0];
		privKeyObj.decrypt(passphrase);
		options.privateKeys = privKeyObj;
		*/
	}

	const enc_object = await openpgp.encrypt(options);
	this.EncryptedBody = enc_object.data;
};