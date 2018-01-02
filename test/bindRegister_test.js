
describe('register', function() {
	this.slow(30000);
	this.timeout(30000);

	beforeEach(async function () {
		await waitForElement('#btnLogin');
		setPageVisible(PAGE_REGISTER);
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
		$('#reg_email').val('');
		$('#reg_phone').val('');
		$('#reg_username').val('demouser');
		$('#reg_password').val('AcomplexP@$$911');
		$('#reg_confirm').val('AcomplexP@$$911');

		sandbox.stub(current_user, 'registerUser').resolves(true);

		$('#btnRegister').click();
		await sleep(1000); // this bounces from login to main
		assert(getPageVisible() === PAGE_REGISTER_VERIFY, "Register verify not visible");
	});

	it('should show error on blank user', ()=>{
		$('#reg_username').val('');
		$('#reg_password').val('AcomplexP@$$911');
		$('#reg_confirm').val('AcomplexP@$$911');
		$('#btnRegister').click();
		assert(getSpiedToast() === "username cannot be empty", "toast text does not match");
	});

	it('should show error on password', ()=>{
		$('#reg_username').val('demouser');
		$('#reg_password').val('');
		$('#reg_confirm').val('AcomplexP@$$911');
		$('#btnRegister').click();
		assert(getSpiedToast() === "password cannot be empty", "toast text does not match");
	});

	it('should show error on confirm not matching', ()=>{
		$('#reg_username').val('demouser');
		$('#reg_password').val('AcomplexP@$$911');
		$('#reg_confirm').val('');
		$('#btnRegister').click();
		assert(getSpiedToast() === "password and confirmation do not match", "toast text does not match");
	});

	it('should show error on insufficient complexity', ()=>{
		$('#reg_username').val('demouser');
		$('#reg_password').val('boring');
		$('#reg_confirm').val('boring');
		$('#btnRegister').click();
		assert(/Password is not sufficiently complex/.test(getSpiedToast()), "toast text does not match");
	});

	it('should go back', async ()=>{
		$('#btnBackRegister').click();
		await sleep(1000);
		assert(getPageVisible() === PAGE_LOGIN, "Login not visible");
	});

});