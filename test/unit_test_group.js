
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
*/
describe('joinGroup', function() {
	this.timeout(10000);

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should successfully join a group', async function () {
		/*
		join group
		approve join
		receive join
		*/
	});

	/*
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
	*/
});

