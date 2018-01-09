
describe('reset password', function() {

	beforeEach(async function () {
		await waitForElement('#btnLogin');
		vm.page_visible = vm.PAGE_RESET_PASSWORD;
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
		vm.reset_code = '123456';
		await Vue.nextTick();

		assert.equal(vm.password,   $('#reset_password').val(), "password doesn't match");
		assert.equal(vm.confirm,    $('#reset_confirm').val(),  "confirm doesn't match");
		assert.equal(vm.reset_code, $('#reset_code').val(),   "phone doesn't match");

		sandbox.stub(current_user, 'resetForgotPassword').resolves(true);
		sandbox.stub(current_user, 'login').resolves(true);

		await Vue.nextTick();
		$('#btnReset').click();
		await Vue.nextTick();
		assert(vm.page_visible === vm.PAGE_MAIN_LIST, "Main not visible");
	});

	it('should show error on blank code', async ()=>{
		vm.username = 'demouser';
		vm.password = 'AcomplexP@$$911';
		vm.confirm  = 'AcomplexP@$$911';
		vm.reset_code = '';
		await Vue.nextTick();
		$('#btnReset').click();
		await Vue.nextTick();
		assert(vm.error_message === "code cannot be empty", "toast text does not match");
	});

	it('should show error on password', async ()=>{
		vm.username = 'demouser';
		vm.password = '';
		vm.confirm  = '';
		vm.reset_code = '123456';
		await Vue.nextTick();
		$('#btnReset').click();
		await Vue.nextTick();
		assert(vm.error_message === "password cannot be empty", "toast text does not match");
	});

	it('should show error on confirm not matching', async ()=>{
		vm.username = 'demouser';
		vm.password = 'AcomplexP@$$911';
		vm.confirm  = 'not matching';
		vm.reset_code = '';
		await Vue.nextTick();
		$('#btnReset').click();
		await Vue.nextTick();
		assert(vm.error_message === "password and confirmation do not match", "toast text does not match");
	});

	it('should show error on insufficient complexity', async ()=>{
		vm.username = 'demouser';
		vm.password = 'password';
		vm.confirm  = 'password';
		vm.reset_code = '';
		await Vue.nextTick();
		$('#btnReset').click();
		await Vue.nextTick();
		assert(/Password is not sufficiently complex/.test(vm.error_message), "toast text does not match");
	});

});