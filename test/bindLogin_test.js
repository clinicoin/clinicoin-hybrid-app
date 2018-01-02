
describe('login', function() {
	beforeEach(async function () {
		await waitForElement('#btnLogin');
		setPageVisible(PAGE_LOGIN);

		// spy on the toast
		sandbox.spy(ons.notification, "toast");
	});

	afterEach(function () {
		// completely restore all fakes created through the sandbox
		sandbox.restore();
	});

	it('should go to main on successful login', async ()=>{
		sandbox.stub(current_user, 'login').returns(true);

		$('#username').val('demouser');
		$('#password').val('password');
		$('#btnLogin').click();
		await sleep(1000);
		assert(getPageVisible() === PAGE_MAIN_LIST, "Main not visible");
	});

	it('should show error on login blank username', ()=>{
		$('#username').val('');
		$('#password').val('');
		$('#btnLogin').click();
		assert(getSpiedToast() === "username cannot be empty", "toast text does not match");
	});

	it('should show error on login blank password', ()=>{
		$('#username').val('demouser');
		$('#password').val('');
		$('#btnLogin').click();
		assert(getSpiedToast() === "password cannot be empty", "toast text does not match");
	});

	it('should go to register', async ()=>{
		$('#divRegister').click();
		await sleep(1000);
		assert(getPageVisible() === PAGE_REGISTER, "Registration not visible");
	});

	it('should show error on forgot password blank username', ()=>{
		$('#username').val('');
		$('#divForgot').click();
		assert(getSpiedToast() === "username cannot be empty", "toast text does not match");
	});

	it('should confirm on forgot password (no confirmation)', ()=>{
		$('#username').val('demouser');

		// stub forgot confirmation
		sandbox.stub(ons.notification, 'confirm').returns(false);

		$('#divForgot').click();
		assert(getSpiedConfirmText() === "Really reset your password?", "confirm text does not match");
	});

	it('should confirm on forgot password (confirmed)', async ()=>{
		$('#username').val('demouser');

		// stub forgot confirmation
		sandbox.stub(ons.notification, 'confirm').returns(true);
		sandbox.stub(current_user, 'userForgotPassword').returns(true);

		$('#divForgot').click();

		assert(getSpiedConfirmText() === "Really reset your password?", "confirm text does not match");
		await getSpiedConfirmFunction()(true); // call the returned function with true confirmed

		assert(getSpiedToast() === "Password reset message sent", "toast text does not match");

		assert(getPageVisible() === PAGE_RESET_PASSWORD, "Registration not visible");
	});

});