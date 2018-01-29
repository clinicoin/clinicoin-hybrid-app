
describe('decryptMessage', function() {

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should decrypt a message', async function () {
		const data_to_encrypt = 'this is my plain-text message';

		let msg = new Message();
		msg.Sender = 'demouser';
		msg.Receiver = 'demouser';
		let signPrivateKeyObj = openpgp.key.readArmored(TEST_PRIVATE_KEY).keys[0];
		signPrivateKeyObj.decrypt(TEST_PRIVATE_KEY_PASSWORD);
		msg.Body = data_to_encrypt;
		await msg.encryptMessage(TEST_PUBLIC_KEY, [signPrivateKeyObj]);

		let actual = new Message();
		actual.EncryptedBody = msg.EncryptedBody;
		await actual.decryptMessage(new Channels(), signPrivateKeyObj);
		assert.equal(data_to_encrypt, actual.Body, "data not decrypted");
	});

	it('should fail on blank contents', async function () {
		let msg = new Message();
		await msg.decryptMessage(new Channels(), []);
		assert.equal("nothing to decrypt", getLastConsoleMessage(), "console messages do not match: "+getLastConsoleMessage());
	});

	it('should fail on blank key', async function () {
		let msg = new Message();
		msg.EncryptedBody = 'encrypted_message';
		await msg.decryptMessage(new Channels(), []);
		assert.equal("no private key", getLastConsoleMessage(), "console messages do not match: "+getLastConsoleMessage());
	});
});

describe('encryptMessage', function() {

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should encrypt a message', async function () {
		let msg = new Message();
		msg.Sender = 'demouser';
		msg.Receiver = 'demouser';
		let signPrivateKeyObj = openpgp.key.readArmored(TEST_PRIVATE_KEY).keys[0];
		signPrivateKeyObj.decrypt(TEST_PRIVATE_KEY_PASSWORD);
		msg.Body = 'message data '+moment().format('x');
		await msg.encryptMessage(TEST_PUBLIC_KEY, [signPrivateKeyObj]);
		assert(msg.EncryptedBody.length>0, "result is false");
	});

	it('should fail on blank contents', async function () {
		let msg = new Message();
		await msg.encryptMessage(TEST_PUBLIC_KEY, []);
		assert.equal("nothing to encrypt", getLastConsoleMessage(), "console messages do not match: "+getLastConsoleMessage());
	});

	it('should fail on blank key', async function () {
		let msg = new Message();
		msg.Body = 'data';
		await msg.encryptMessage('', []);
		assert.equal("no destination public key", getLastConsoleMessage(), "console messages do not match: "+getLastConsoleMessage());
	});
});
