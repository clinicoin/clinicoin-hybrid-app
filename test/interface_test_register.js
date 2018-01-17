
describe('register', function() {
	this.slow(30000);
	this.timeout(30000);

	before(()=>{
		logger.debug('ARE YOU LOGGED OUT? It will not work otherwise...');
		current_user.logout();
	});

	beforeEach(async function () {
		await waitForElement('#btnLogin');
		vm.page_visible = vm.PAGE_REGISTER;
		await sleep(1000);
	});

	afterEach(function () {
		// completely restore all fakes created through the sandbox
		sandbox.restore();
	});

	it('should confirm on full entry', async ()=>{
		vm.username = 'demouser';
		vm.password = 'AcomplexP@$$911';
		vm.confirm  = 'AcomplexP@$$911';
		vm.email = 'demouser@mailsac.com';
		vm.phone = '3214567894';
		await Vue.nextTick();

		assert.equal(vm.username, $('#reg_username').val(), "username doesn't match");
		assert.equal(vm.password, $('#reg_password').val(), "password doesn't match");
		assert.equal(vm.confirm,  $('#reg_confirm').val(),  "confirm doesn't match");
		assert.equal(vm.phone,    $('#reg_phone').val(),    "phone doesn't match");
		assert.equal(vm.email,    $('#reg_email').val(),    "email doesn't match");

		sandbox.stub(current_user, 'registerUser').resolves(true);

		await Vue.nextTick();
		$('#btnRegister').click();
		await Vue.nextTick();
		assert(vm.page_visible === vm.PAGE_REGISTER_VERIFY, "Register verify not visible");
	});

	it('should show error on blank user', async ()=>{
		vm.username = '';
		vm.password = 'AcomplexP@$$911';
		vm.email = 'demouser@mailsac.com';
		await Vue.nextTick();
		$('#btnRegister').click();
		await Vue.nextTick();

		assert(vm.error_message === "username cannot be empty", "toast text does not match: "+vm.error_message);
	});

	it('should show error on password', async ()=>{
		vm.username = 'demouser';
		vm.password = '';
		vm.email = 'demouser@mailsac.com';
		vm.phone = '3214567894';
		await Vue.nextTick();
		$('#btnRegister').click();
		await Vue.nextTick();

		assert(vm.error_message === "password cannot be empty", "toast text does not match: "+vm.error_message);
	});

	it('should show error on no phone', async ()=>{
		vm.username = 'demouser';
		vm.password = 'AcomplexP@$$911';
		vm.email = 'demouser@mailsac.com';
		vm.phone = '';
		await Vue.nextTick();
		$('#btnRegister').click();
		await Vue.nextTick();

		assert(vm.error_message === "phone cannot be empty", "toast text does not match: "+vm.error_message);
	});

	it('should show error on no email', async ()=>{
		vm.username = 'demouser';
		vm.password = 'AcomplexP@$$911';
		vm.email = '';
		vm.phone = '3214567894';
		await Vue.nextTick();
		$('#btnRegister').click();
		await Vue.nextTick();

		assert(vm.error_message === "email cannot be empty", "toast text does not match: "+vm.error_message);
	});

	it('should show error on bad email', async ()=>{
		vm.username = 'demouser';
		vm.password = 'AcomplexP@$$911';
		vm.email = 'email';
		vm.phone = '3214567894';
		await Vue.nextTick();
		$('#btnRegister').click();
		await Vue.nextTick();

		assert(vm.error_message === "email pattern not matched", "toast text does not match");
	});

	it('should show error on confirm not matching', async ()=>{
		vm.username = 'demouser';
		vm.password = 'AcomplexP@$$911';
		vm.confirm  = '';
		vm.phone = '3214567894';
		vm.email = 'demouser@mailsac.com';

		await Vue.nextTick();
		$('#btnRegister').click();
		await Vue.nextTick();
		assert(vm.error_message === "password and confirmation do not match", "toast text does not match: "+vm.error_message);
	});

	it('should show error on insufficient complexity', async ()=>{
		vm.username = 'demouser';
		vm.password = 'boring';
		vm.confirm  = 'boring';
		vm.phone = '3214567894';
		vm.email = 'demouser@mailsac.com';

		await Vue.nextTick();
		$('#btnRegister').click();
		await Vue.nextTick();
		assert(/Password is not sufficiently complex/.test(vm.error_message), "toast text does not match: "+vm.error_message);
	});

});