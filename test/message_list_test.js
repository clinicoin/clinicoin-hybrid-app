const msg_list = new MessageList();
/*
describe('getRecipientPublicKey', function() {
	this.slow(30000);
	this.timeout(30000); // A very long environment setup.

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('retrieve a known public key', async function () {
		await loginDemoUser();
		let test_list = new MessageList();
		test_list.recipient_user_id = 'demouser';
		const result = await test_list.getRecipientPublicKey();
		assert.isTrue(result, "result is false");
		assert.equal('Demo_Public_key', test_list.recipient_public_key);
	});

	it('fail on unknown user', async function () {
		await loginDemoUser();
		let test_list = new MessageList();
		test_list.recipient_user_id = 'user_not_existing';
		const result = await test_list.getRecipientPublicKey();
		assert.isFalse(result, "result is true");
	});

	it('fail on blank user', async function () {
		let test_list = new MessageList();
		test_list.recipient_user_id = '';
		const result = await test_list.getRecipientPublicKey();
		assert.isFalse(result, "result is true");
	});
});
*/
describe('encryptMessage', function() {
	this.slow(30000);
	this.timeout(30000); // A very long environment setup.

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('encrypt a message', async function () {
		current_user.setPrivateKey(TEST_PRIVATE_KEY);
		current_user.setPassphrase(TEST_PRIVATE_KEY_PASSWORD);
		let test_list = new MessageList();
		test_list.recipient_user_id = 'demouser';
		test_list.recipient_public_key = TEST_PUBLIC_KEY;
		let data_to_encrypt = 'this is my plain-text message';
		const encrypted_data = await test_list.encryptMessage(data_to_encrypt, true);
		assert(encrypted_data.length>0, "result is false");
	});

	it('fail on blank contents', async function () {
		let test_list = new MessageList();
		test_list.recipient_public_key = TEST_PUBLIC_KEY;
		let data_to_encrypt = '';
		const result = await test_list.encryptMessage(data_to_encrypt, true);
		assert.isFalse(result, "result is true");
	});

	it('fail on blank key', async function () {
		let test_list = new MessageList();
		test_list.recipient_public_key = '';
		let data_to_encrypt = 'something';
		const result = await test_list.encryptMessage(data_to_encrypt, true);
		assert.isFalse(result, "result is true");
	});
});