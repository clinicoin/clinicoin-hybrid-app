

describe('reset password', function() {

	beforeEach(async function () {
		await waitForElement('#btnLogin');
		vm.page_visible = vm.PAGE_REGISTER_VERIFY;
		await sleep(1000);

		// spy on the toast
		sandbox.spy(ons.notification, "toast");
	});

	afterEach(function () {
		// completely restore all fakes created through the sandbox
		sandbox.restore();
	});

	it('should confirm on full entry', async () => {
		$('#registration_code').val('123456');

		sandbox.stub(current_user, 'verifyConfirmationCode').resolves(true);
		sandbox.stub(current_user, 'login').resolves(true);

		$('#btnConfirmRegistration').click();
		await sleep(1000); // this bounces from login to main
		assert(getPageVisible() === PAGE_MAIN_LIST, "Main not visible");
	});

	it('should show error on empty code', ()=>{
		$('#registration_code').val('');
		$('#btnConfirmRegistration').click();
		assert(getSpiedToast() === "code cannot be empty", "toast text does not match");
	});

	it('should show error on bad code', async () => {
		$('#registration_code').val('123456');

		sandbox.stub(current_user, 'verifyConfirmationCode').resolves(false);

		$('#btnConfirmRegistration').click();
		assert(/Verify Failed:/.test(getSpiedToast()), "toast text does not match");
	});

	it('should be able to resend', ()=>{
		$('#divResendConfirmation').click();
		assert(getSpiedToast() === "Registration confirmation code re-sent", "toast text does not match");
	});
});