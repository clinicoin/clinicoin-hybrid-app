

describe('reset password', function() {
	this.timeout(10000);

	before(()=>{
		logger.debug('ARE YOU LOGGED OUT? It will not work otherwise...');
		current_user.logout();
	});

	beforeEach(async function () {
		await waitForElement('#btnLogin');
		vm.page_visible = vm.PAGE_REGISTER_VERIFY;
		await sleep(1000);
	});

	afterEach(function () {
		// completely restore all fakes created through the sandbox
		sandbox.restore();
	});

	it('should confirm on full entry', async () => {
		vm.register_code = '123456';
		await Vue.nextTick();
		assert.equal(vm.register_code, $('#register_code').val(), "registration doesn't match");

		sandbox.stub(current_user, 'verifyConfirmationCode').resolves(true);
		sandbox.stub(vm, 'loginUser').resolves(true);

		vm.auto_login = false;

		$('#btnConfirmRegistration').click();
		await sleep(3000);
		await Vue.nextTick();
		assert(vm.page_visible === vm.PAGE_LOGIN, "Login not visible");
	});

	it('should show error on empty code', async ()=>{
		vm.register_code = '';
		await Vue.nextTick();
		$('#btnConfirmRegistration').click();
		await Vue.nextTick();
		assert(vm.error_message === "code cannot be empty", "text does not match: "+vm.error_message);
	});

	it('should show error on bad code', async () => {
		vm.register_code = '111111';
		current_user.last_error_message = 'test error message';
		await Vue.nextTick();
		sandbox.stub(current_user, 'verifyConfirmationCode').resolves(false);

		$('#btnConfirmRegistration').click();
		await Vue.nextTick();
		assert(vm.error_message === 'test error message', "text does not match: "+vm.error_message);
	});

	it('should be able to resend', async ()=>{
		current_user.username = 'demouser';
		vm.username = 'demouser';

		sandbox.stub(current_user, 'resendConfirmationCode').resolves(true);

		await Vue.nextTick();
		$('#divResendConfirmation').click();
		await Vue.nextTick();
		assert(vm.info_message === "Registration confirmation code re-sent", "toast text does not match: "+vm.error_message);
	});

});