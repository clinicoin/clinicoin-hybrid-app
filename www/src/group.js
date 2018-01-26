
class Group extends MessageList
{
	Name = '';
	Admins = [];
	Users = [];
	PrivateKey = '';
	PublicKey = '';

	constructor()
	{
		super();
	}

	processIncoming = async function (msg)
	{
		// separate the encrypted message body from the admin signature

		const decrypted_obj = await this.decryptMessage(msg.EncryptedBody);

		msg.Body = decrypted_obj.data;

		if (decrypted_obj.signatures.length > 0 && decrypted_obj.signatures[0].valid) {
			logger.info("valid signature");
			msg.Signed = true;
		}

		msg.EncryptedBody = '';  // stripping off to reduce size

		if (_.isEmpty(msg.MessageType)) {
			this.messages.push(msg);
			await msg_list.saveMessage(msg);
		}
		else if (_.find(this.Admins, { 'username': msg.Sender })) {
			// make sure sender is in the list of admins
			// get the admin sender's latest public key
			// separate into processing of add user, remove user, new key, change key, promote, demote
		}
	};

	receiveAddUser = function () {
		// add a regular user
	};

	receiveRemoveUser = function () {
		// remove a regular user
	};

	receiveChangeKey = function () {
		// receive a new key or change an existing
	};

	receivePromoteUser = function () {
		// promote a regular user to an admin
	};

	receiveDemoteUser = function () {
		// change an admin to a regular user
	};

	adminGenerateNewKey = function () {
		// admin method to create a new key + passphrase for distribution
	};

	adminAddUser = function () {
		// add a regular user
	};

	adminRemoveUser = function () {
		// remove a regular user
	};

	adminChangeKey = function () {
		// admin a new key or change an existing
	};

	adminPromoteUser = function () {
		// promote a regular user to an admin
	};

	adminDemoteUser = function () {
		// change an admin to a regular user
	};

	sendMessage = function()
	{
		// use a lambda function to send a message to the group of users
	};

	decryptMessage = async function (encrypted_data) {
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

		// add the list key to check validity
		options.publicKeys = openpgp.key.readArmored(this.recipient_public_key).keys;

		// TODO: add admin key for validity

		// returns object formatted with properties of data:string and signatures:[].valid
		const decrypted_obj = await openpgp.decrypt(options);

		logger.info("data decrypted");

		return decrypted_obj;
	};
}