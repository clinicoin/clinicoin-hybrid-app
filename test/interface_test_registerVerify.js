

describe('reset password', function() {

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
		assert.equal(vm.register_code, $('#registration_code').val(), "registration doesn't match");

		sandbox.stub(current_user, 'verifyConfirmationCode').resolves(true);
		sandbox.stub(current_user, 'login').resolves(true);

		$('#btnConfirmRegistration').click();
		await Vue.nextTick();
		assert(vm.page_visible === vm.PAGE_MAIN_LIST, "Main not visible");
	});

	it('should show error on empty code', async ()=>{
		vm.register_code = '123456';
		await Vue.nextTick();
		$('#btnConfirmRegistration').click();
		await Vue.nextTick();
		assert(vm.error_message === "code cannot be empty", "text does not match");
	});

	it('should show error on bad code', async () => {
		$('#registration_code').val('111111');

		sandbox.stub(current_user, 'verifyConfirmationCode').resolves(false);

		$('#btnConfirmRegistration').click();
		await Vue.nextTick();
		assert(/Verify Failed:/.test(vm.error_message), "text does not match");
	});

	it('should be able to resend', async ()=>{
		$('#divResendConfirmation').click();
		await Vue.nextTick();
		assert(vm.info_message === "Registration confirmation code re-sent", "toast text does not match");
	});
});