
describe('reset password', function() {

	beforeEach(async function () {
		await waitForElement('#btnLogin');
		setPageVisible(PAGE_RESET_PASSWORD);
		await sleep(1000);

		// stub forgot confirmation
		sandbox.stub(ons.notification, 'confirm').returns(true);

		// spy on the toast
		sandbox.spy(ons.notification, "toast");
	});

	afterEach(function () {
		// completely restore all fakes created through the sandbox
		sandbox.restore();
	});

	it('should confirm on full entry', async ()=>{
		$('#username').val('demouser');
		$('#reset_code').val('123456');
		$('#reset_password').val('AcomplexP@$$911');
		$('#reset_confirm').val('AcomplexP@$$911');

		sandbox.stub(current_user, 'forgotPasswordReset').resolves(true);
		sandbox.stub(current_user, 'login').resolves(true);

		$('#btnReset').click();
		await sleep(1000); // this bounces from login to main
		assert(getPageVisible() === PAGE_MAIN_LIST, "Main not visible");
	});

	it('should show error on blank code', ()=>{
		$('#reset_code').val('');
		$('#reset_password').val('AcomplexP@$$911');
		$('#reset_confirm').val('AcomplexP@$$911');
		$('#btnReset').click();
		assert(getSpiedToast() === "code cannot be empty", "toast text does not match");
	});

	it('should show error on password', ()=>{
		$('#reset_code').val('123456');
		$('#reset_password').val('');
		$('#reset_confirm').val('');
		$('#btnReset').click();
		assert(getSpiedToast() === "password cannot be empty", "toast text does not match");
	});

	it('should show error on confirm not matching', ()=>{
		$('#reset_code').val('123456');
		$('#reset_password').val('AcomplexP@$$911');
		$('#reset_confirm').val('');
		$('#btnReset').click();
		assert(getSpiedToast() === "password and confirmation do not match", "toast text does not match");
	});

	it('should show error on insufficient complexity', ()=>{
		$('#reset_code').val('123456');
		$('#reset_password').val('password');
		$('#reset_confirm').val('password');
		$('#btnReset').click();
		assert(/Password is not sufficiently complex/.test(getSpiedToast()), "toast text does not match");
	});

	it('should go back', async ()=>{
		$('#btnBackResetPassword').click();
		await sleep(1000);
		assert(getPageVisible() === PAGE_LOGIN, "Login not visible");
	});

});