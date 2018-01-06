
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
		sleep(2000);
		const receive_list = await channels.retrieveMessagesFromServer();
		assert(receive_list.length>0, "no messages to see");
		assert.equal(msg, _.last(receive_list).Body, "messages do not match");

		// clean up
		channels.deleteReceivedMessage(_.last(receive_list).ReceiptHandle);
	});
});

describe('decryptMessage', function() {

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
		const decrypted_data = await channels.decryptMessage(encrypted_data);
		assert.equal(data_to_encrypt, decrypted_data.data, "data not decrypted");
	});

	it('should fail on blank contents', async function () {
		current_user.setPrivateKey(TEST_PRIVATE_KEY);
		const decrypted_data = await channels.decryptMessage('');
		assert.isFalse(decrypted_data, "result is true");
	});

	it('should fail on blank key', async function () {
		current_user.setPrivateKey('');
		const result = await channels.decryptMessage('something');
		assert.isFalse(result, "result is true");
	});
});

describe('getChannels', function() {

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should retrieve the demouser channel', async function () {
		const actual = await channels.getChannels();
		const demo_list = _.find(actual, { "recipient_user_id":"demouser" });
		assert(demo_list.recipient_user_id === 'demouser');
	});
});

describe('addChannel', function() {

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should add new channel', async function () {
		const starting_count = (await channels.getChannels()).length;
		logger.debug("starting channel count: "+starting_count);
		logger.debug("starting array count: "+channels.channel_list.length);
		const new_channel_name = 'test'+moment().format('x');
		await channels.addChannel(new_channel_name);
		logger.debug("channel array count: "+channels.channel_list.length);
		logger.debug(channels.channel_list);
		assert(channels.channel_list.length === starting_count+1, "channel count is off");
	});

	it('should not count existing channels', async function () {
		const starting_count = (await channels.getChannels()).length;
		logger.debug("starting channel count: "+starting_count);
		logger.debug("starting array count: "+channels.channel_list.length);
		const new_channel_name = 'demouser';
		await channels.addChannel(new_channel_name);
		logger.debug("channel array count: "+channels.channel_list.length);
		assert(channels.channel_list.length === starting_count, "channel count is off");
	});

	after(async function(){
		// clean up
		const exp = new RegExp('^ch_test\\d+_Settings');
		await store.removeItemsExpression(exp);
	});

});

describe('end-to-end: sendMessage/checkForMessages', function() {
	this.slow(30000);
	this.timeout(30000); // A very long environment setup.

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should send and receive', async function (done) {
		setTimeout(done, 30000);

		current_user = await loginDemoUser();
		current_user.user_id = 'demouser';
		current_user.setPrivateKey(TEST_PRIVATE_KEY);
		current_user.setPassphrase(TEST_PRIVATE_KEY_PASSWORD);

		const msg_list = new MessageList();
		msg_list.recipient_user_id = 'demouser';
		msg_list.recipient_public_key = TEST_PUBLIC_KEY;
		msg_list.last_public_key_retrieval = moment();
		const plain_text = 'demo message '+moment().format('x');
		const new_msg = await msg_list.sendMessage(plain_text);

		// double-check the msg can be decrypted
		const decrypted_obj = await channels.decryptMessage(new_msg.EncryptedBody);
		assert(decrypted_obj.data === plain_text);
		logger.debug("decryption success");
		// logger.debug(new_msg.EncryptedBody);

		assert(msg_list.messages.length === 1, "message count is whack");

		await channels.getChannels();
		const receive_list = new MessageList();
		channels.channel_list.push(receive_list);
		receive_list.recipient_user_id = 'demouser';
		const receive_result = await channels.checkForMessages();
		assert.isTrue(receive_result, "send result is false");
		assert(msg_list.messages.length === 1, "message count is whack");

		done();
	});
});
