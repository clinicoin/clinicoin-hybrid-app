const msg_list = new MessageList();
/*
describe('getRecipientPublicKey', function() {
	this.slow(30000);
	this.timeout(30000); // A very long environment setup.

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should retrieve a known public key', async function () {
		await loginDemoUser();
		let test_list = new MessageList();
		test_list.recipient_user_id = 'demouser';
		const result = await test_list.getRecipientPublicKey();
		assert.isTrue(result, "result is false");
		assert.equal('Demo_Public_key', test_list.recipient_public_key);
	});

	it('should fail on unknown user', async function () {
		await loginDemoUser();
		let test_list = new MessageList();
		test_list.recipient_user_id = 'user_not_existing';
		const result = await test_list.getRecipientPublicKey();
		assert.isFalse(result, "result is true");
	});

	it('should fail on blank user', async function () {
		let test_list = new MessageList();
		test_list.recipient_user_id = '';
		const result = await test_list.getRecipientPublicKey();
		assert.isFalse(result, "result is true");
	});
});

describe('encryptMessage', function() {

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should encrypt a message', async function () {
		current_user.setPrivateKey(TEST_PRIVATE_KEY);
		current_user.setPassphrase(TEST_PRIVATE_KEY_PASSWORD);
		let test_list = new MessageList();
		test_list.recipient_user_id = 'demouser';
		test_list.recipient_public_key = TEST_PUBLIC_KEY;
		let data_to_encrypt = 'this is my plain-text message';
		const encrypted_data = await test_list.encryptMessage(data_to_encrypt, true);
		assert(encrypted_data.length>0, "result is false");
	});

	it('should fail on blank contents', async function () {
		let test_list = new MessageList();
		test_list.recipient_public_key = TEST_PUBLIC_KEY;
		let data_to_encrypt = '';
		const result = await test_list.encryptMessage(data_to_encrypt, true);
		assert.isFalse(result, "result is true");
	});

	it('should fail on blank key', async function () {
		let test_list = new MessageList();
		test_list.recipient_public_key = '';
		let data_to_encrypt = 'something';
		const result = await test_list.encryptMessage(data_to_encrypt, true);
		assert.isFalse(result, "result is true");
	});
});

describe('sendToServer', function() {
	this.timeout(10000);

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should send message to queue', async function () {
		await loginDemoUser();
		let test_list = new MessageList();
		test_list.recipient_user_id = 'demouser';
		const result = await test_list.sendToServer('message2');
		assert.isTrue(result, "result is false");
	});

	it('should fail on blank message', async function () {
		let test_list = new MessageList();
		test_list.recipient_user_id = 'demouser';
		const result = await test_list.sendToServer('');
		assert.isFalse(result, "result is true");
	});

	it('should fail on blank recipient', async function () {
		let test_list = new MessageList();
		test_list.recipient_user_id = '';
		const result = await test_list.sendToServer('something');
		assert.isFalse(result, "result is true");
	});

	it('should fail bad recipient', async function () {
		let test_list = new MessageList();
		test_list.recipient_user_id = 'unknownreceipient';
		const result = await test_list.sendToServer('something');
		assert.isFalse(result, "result is true");
	});
});
*/

describe('saveMessage/loadMessages', function() {

	beforeEach(function () {
		Minilog.backends.array.empty();
	});
});

describe('saveSettings/loadSettings', function() {

	beforeEach(function () {
		Minilog.backends.array.empty();
	});
});