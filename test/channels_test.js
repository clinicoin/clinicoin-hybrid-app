

describe('retrieveMessagesFromServer', function() {
	this.timeout(5000);

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should retrieve from queue', async function () {
		await loginDemoUser();
		let test_list = new MessageList();
		test_list.recipient_user_id = 'demouser';
		current_user.user_id = 'demouser';
		const d = new Date();
		const msg = 'message '+d.getTime().toString();
		const send_result = await test_list.sendToServer(msg);
		assert.isTrue(send_result, "sending failed");
		const receive_list = await test_list.retrieveMessagesFromServer();
		assert(receive_list.length>0, "no messages to see");
		assert.equal(msg, _.last(receive_list).Body, "messages do not match");
	});
});

describe('deleteReceivedMessage', function() {
	this.timeout(5000);

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should delete received messages from queue', async function () {
		await loginDemoUser();
		let test_list = new MessageList();
		current_user.user_id = 'demouser';
		const receive_list = await test_list.retrieveMessagesFromServer();
		assert(receive_list.length>0, "no messages to see");
		const _last_message = _.last(receive_list);
		logger.debug("last message body: "+_last_message.Body);
		const delete_result = await test_list.deleteReceivedMessage(_last_message.ReceiptHandle);
		assert.isTrue(delete_result, "result is false");
	});

	it('should fail with bad handle', async function () {
		await loginDemoUser();
		let test_list = new MessageList();
		const delete_result = await test_list.deleteReceivedMessage("badhandle");
		assert.isFalse(delete_result, "result is true");
	});
});

describe('encryptMessage', function() {

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should decrypt a message', async function () {
		current_user.setPrivateKey(TEST_PRIVATE_KEY);
		current_user.setPassphrase(TEST_PRIVATE_KEY_PASSWORD);
		let test_list = new MessageList();
		test_list.recipient_user_id = 'demouser';
		test_list.recipient_public_key = TEST_PUBLIC_KEY;
		let data_to_encrypt = 'this is my plain-text message';
		const encrypted_data = await test_list.encryptMessage(data_to_encrypt, true);
		assert(encrypted_data.length>0, "result is false");
		const decrypted_data = await test_list.decryptMessage(encrypted_data);
		assert.equal(data_to_encrypt, decrypted_data.data, "data not decrypted");
	});

	it('should fail on blank contents', async function () {
		let test_list = new MessageList();
		current_user.setPrivateKey(TEST_PRIVATE_KEY);
		const decrypted_data = await test_list.decryptMessage('');
		assert.isFalse(decrypted_data, "result is true");
	});

	it('should fail on blank key', async function () {
		let test_list = new MessageList();
		test_list.recipient_public_key = '';
		let data_to_encrypt = 'something';
		const result = await test_list.encryptMessage(data_to_encrypt, true);
		assert.isFalse(result, "result is true");
	});
});