
/*
describe('createGroup', function() {
	this.timeout(10000);

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should successfully create a new group', async function () {
		await loginDemoUser();
		current_user.username = 'demouser';
		const group_name = 'group'+moment().format('x');
		const new_group = await Group.createGroup(group_name);
		assert(typeof new_group === 'object',"create failure: "+new_group);

		// compare the server's public key
		const actual_group = new Group();
		actual_group.group_name = group_name;
		await actual_group.getGroupKey();
		assert.equal(actual_group.group_public_key, new_group.group_public_key, "public keys do not match");
	});

	it('should fail on existing name that is not local', async function () {
		await loginDemoUser();
		const error = await Group.createGroup('test_group');
		assert.equal('group with that name already exists',error,"error result not matched: "+error);
	});

	it('should fail on undefined group name', async function () {
		const error = await Group.createGroup();
		assert.equal('group name is empty',error,"error result not matched: "+error);
	});

	it('should fail on empty group name', async function () {
		const error = await Group.createGroup('    ');
		assert.equal('group name is empty',error,"error result not matched: "+error);
	});

	it('should fail on bad group name', async function () {
		const error = await Group.createGroup('*$');
		assert.equal('group name contains non-word characters',error,"error result not matched: "+error);
	});

	it('should fail on existing name that is local', async function () {
		channels.channel_list.push({recipient_user_id: "local_group"});
		const error = await Group.createGroup('local_group');
		assert.equal('group name exists locally',error,"error result not matched: "+error);
	});

});

describe('joinGroup', function() {
	this.timeout(10000);

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	afterEach(function () {
		// completely restore all fakes created through the sandbox
		sandbox.restore();
	});

	it('should successfully (really) join an open group', async function () {
		const group_name = 'group'+moment().format('x');

		// create new user1
		const user1 = await createConfirmLoginUser();

		// create open group1 (user1 automatically admin)
		current_user = user1;
		let user1_group = await Group.createGroup(group_name, "open");
		const user1Channels = new Channels();
		channels = user1Channels;
		user1Channels.addGroupChannel(user1_group);

		assert.equal(1, user1_group.admin_list.length, "no admins listed");
		assert.equal(current_user.username, user1_group.admin_list[0], "current user not an admin");

		// create new user2 and join
		const user2 = await createConfirmLoginUser();
		current_user = user2;
		const user2Channels = new Channels();
		channels = user2Channels;
		await Group.userJoinRequest(group_name);

		// process requests to group through user1 (auto-approve)
		current_user = user1;
		channels = user1Channels;
		await user1Channels.checkForMessages(user1_group);
		assert(user1_group.user_list.length === 1, 'new user not added');

		// user2 receives new public/private key to their path
		current_user = user2;
		channels = user2Channels;
		await user2Channels.checkForMessages();

		await channels.getChannels();
		const actual_group = channels.findByUsername(group_name);

		assert.equal(group_name, actual_group.group_name, 'names do not match');
		assert.equal(actual_group.group_private_key, user1_group.group_private_key, 'private key does not match');
		assert(actual_group.admin_list[0] === user1.username);
	});

	it('should successfully join an open group', async function () {
		await loginDemoUser();
		current_user.username = 'demouser';

		// join group
		let group = new Group();

		sandbox.stub(group, 'getRecipientPublicKey').resolves(true);
		const send_member_stub = sandbox.stub(group, 'sendMemberMessage').resolves(true);
		sandbox.stub(group, 'saveSettings');

		const group_name = 'test_group';
		await group.userJoinRequest(group_name);

		let msg = new Message();
		msg.Sender = 'demouser';
		msg.MessageId = 'cmd_6';
		msg.Body = JSON.stringify(send_member_stub.getCall(0).args[0]);

		group.recipient_public_key = null;

		group.processMessage(msg);

		const approve_msg = send_member_stub.getCall(1).args[0];

		assert(approve_msg.status === 'join_approved', "approve message not found");
	});

	it('should successfully join a closed group', async function () {
		await loginDemoUser();
		current_user.username = 'demouser';

		// join group
		let group = new Group();
		group.admin_list.push('demouser');
		group.group_type = 'closed';

		sandbox.stub(group, 'getRecipientPublicKey').resolves(true);
		const send_member_stub = sandbox.stub(group, 'sendMemberMessage').resolves(true);
		sandbox.stub(group, 'saveSettings');

		const group_name = 'test_group';
		await group.userJoinRequest(group_name);

		let msg = new Message();
		msg.Sender = 'demouser';
		msg.MessageId = 'cmd_6';
		msg.Body = JSON.stringify(send_member_stub.getCall(0).args[0]);

		group.recipient_public_key = null;

		group.processMessage(msg);

		await group.adminApproveJoin(user_name);

		const approve_msg = send_member_stub.getCall(1).args[0];

		assert(approve_msg.status === 'join_approved', "approve message not found");
	});

	it('should fail on undefined group name', async function () {
		await loginDemoUser();
		const group = new Group;
		const error = await group.joinGroup();
		assert.equal('group name is empty',error,"error result not matched: "+error);
	});

	it('should fail on empty group name', async function () {
		await loginDemoUser();
		const group = new Group;
		const error = await group.joinGroup('   ');
		assert.equal('group name is empty',error,"error result not matched: "+error);
	});

	it('should fail on non-existing name', async function () {
		await loginDemoUser();
		const group = new Group;
		const error = await group.joinGroup('fake_group_name');
		assert.equal('group not found',error,"error result not matched: "+error);
	});

	it('should fail on existing name that is local', async function () {
		channels.channel_list.push({recipient_user_id: "local_group"});
		await loginDemoUser();
		const group = new Group;
		const error = await group.joinGroup('local_group');
		assert.equal('group name exists locally',error,"error result not matched: "+error);
	});
});

describe('distributeNewKey', function() {
	this.timeout(10000);

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should distribute key', async function () {
		current_user.generateKey();

		const lambda_stub = sandbox.stub(current_user, 'callLambda').resolves(true);

		const group = new Group();
		group.group_public_key = current_user.getPublicKey();
		group.group_private_key = current_user.getPrivateKey();
		group.distributeNewKey();

		const stub_arg = lambda_stub.getCall(0).args[0].Payload;

		assert.equal(group.group_name, stub_arg.sender, "sender not matched");
	});
});

describe('removeMember', function() {
	this.timeout(10000);

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should remove member', async function () {
		const group = new Group();
		group.user_list = ["usera","userb","userc"];
		const send_member_stub = sandbox.stub(group, 'sendMemberMessage').resolves(true);
		const settings_stub = sandbox.stub(group, 'saveSettings').resolves(true);
		const distribute_stub = sandbox.stub(group, 'distributeNewKey').resolves(true);

		group.removeMember('usera');

		assert.equal(2, group.user_list.length, "user did not get removed");
	});
});
*/
