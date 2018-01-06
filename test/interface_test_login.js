
describe('login', function() {
	this.timeout(20000);

	beforeEach(async function () {
		await waitForElement('#btnLogin');
		vm.page_visible = vm.PAGE_LOGIN;
	});

	afterEach(function () {
		// completely restore all fakes created through the sandbox
		sandbox.restore();
	});
/*
	it('should go to main on successful login', async ()=>{
		sandbox.stub(current_user, 'login').returns(true);
		$('#login_username').val('demouser');
		$('#login_password').val('password');
		$('#btnLogin').click();
		await sleep(1000);
		assert(vm.page_visible === vm.PAGE_MAIN_LIST, "Main not visible");
	});
*/
	it('should show error on login blank username', async ()=>{
		vm.username = '';
		await Vue.nextTick();
		assert.equal('', $('#login_username').val(), "username not blank");
		$("#btnLogin").click();
		assert(vm.error_message === "username cannot be empty", "toast text does not match-- "+vm.error_message);
	});
	it('should show error on login blank password', async ()=>{
		vm.username = 'demouser';
		vm.password = '';
		await Vue.nextTick();
		$('#btnLogin').click();
		assert(vm.error_message === "password cannot be empty", "toast text does not match-- "+vm.error_message);
	});

	it('should show error on forgot password blank username', async ()=>{
		vm.username = '';
		await Vue.nextTick();
		$('#btnForgot').click();
		assert(vm.error_message === "username cannot be empty", "toast text does not match-- "+vm.error_message);
	});

	it('should confirm on forgot password (no confirmation)', async ()=>{
		vm.username = 'demouser';
		await Vue.nextTick();

		$('#btnForgot').click();
		await Vue.nextTick();

		assert.isTrue(vm.show_forgot_password_dialog, "confirm not showing");

		$("#btnCancelForgotPassword").click();
		await Vue.nextTick();

		assert.isFalse(vm.show_forgot_password_dialog, "confirm still showing");
	});

	it('should confirm on forgot password (confirmed)', async ()=>{
		vm.username = 'demouser';
		await Vue.nextTick();

		// stub forgot confirmation
		sandbox.stub(current_user, 'userForgotPassword').returns(true);

		$('#btnForgot').click();
		await Vue.nextTick();

		assert.isTrue(vm.show_forgot_password_dialog, "confirm not showing");

		$("#btnSendForgotPassword").click();
		await Vue.nextTick();

		assert(vm.info_message === "Password reset message sent", "toast text does not match-- "+vm.info_message);

		assert.isFalse(vm.show_forgot_password_dialog, "confirm still showing");

		assert(vm.page_visible === vm.PAGE_RESET_PASSWORD, "Registration not visible");
	});
});