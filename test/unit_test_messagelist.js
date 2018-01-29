const msg_list = new MessageList();

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

describe('saveMessage/loadMessages', function() {

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	afterEach(()=>{
		let test_list = new MessageList();
		test_list.recipient_user_id = 'demouser';
		test_list.removeAllMessages();
	});

	it('should load saved messages', async function () {
		let test_list = new MessageList();
		test_list.recipient_user_id = 'demouser';

		let msg = new Message();
		msg.Username = 'demouser';
		msg.Body = 'test message '+moment().format('x');
		msg.MessageId = '123456';
		const save_result = await test_list.saveMessage(msg);
		assert.isTrue(save_result, "result is false");

		let actual_list = new MessageList();
		actual_list.recipient_user_id = 'demouser';
		const load_result = await actual_list.loadMessages();
		assert.isTrue(load_result, "result is false");

		assert(0 < actual_list.messages.length, 'no messages loaded');
		assert.equal(msg.Body, _.last(actual_list.messages).Body, "Body message does not match");
	});

	it('should handle having no messages', async function () {
		let actual_list = new MessageList();
		const load_result = await actual_list.loadMessages();
		assert.isTrue(load_result, "result is false");
		assert.equal(0, actual_list.messages.length, 'messages loaded when they should not be');
	});
});

describe('saveSettings/loadSettings', function() {

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should load settings', async function () {
		let test_list = new MessageList();
		test_list.recipient_user_id = 'demouser';
		const save_result = await test_list.saveSettings();
		assert.isTrue(save_result, "result is false");

		let actual_list = new MessageList();
		actual_list.recipient_user_id = 'demouser';
		const load_result = await actual_list.loadSettings();
		assert.isTrue(load_result, "result is false");
		assert.equal('demouser', actual_list.recipient_user_id, "wrong setting");
	});

	it('should work on empty settings', async function () {
		let actual_list = new MessageList();
		actual_list.recipient_user_id = 'fake_user';
		const load_result = await actual_list.loadSettings();
		assert.isTrue(load_result, "result is false");
	});
});

describe('removeSettings', function() {

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should load settings', async function () {
		let test_list = new MessageList();
		test_list.recipient_user_id = 'removable';
		test_list.recipient_public_key = 'key';
		const save_result = await test_list.saveSettings();
		assert.isTrue(save_result, "result is false");

		await test_list.removeSettings();

		let actual_list = new MessageList();
		actual_list.recipient_user_id = 'removable';
		const load_result = await actual_list.loadSettings();
		assert.isTrue(load_result, "result is false");
		assert(actual_list.recipient_public_key==='', 'Value exists: '+actual_list.recipient_user_id);
	});
});
