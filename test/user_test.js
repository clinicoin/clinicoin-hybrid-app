let user = new User();
user.name = 'test';
user.username = 'test'+_.random(1111,9999); // random username
user.email = user.username+"@mailsac.com";
user.phone = '+12125551217';
user.setPassphrase('aGreatPhrase321!');

describe('generateKey', function() {
	beforeEach(function() {
		Minilog.backends.array.empty();
	});

	it('should return a key', async function() {
		const result = await user.generateKey();
		const public_key = user.getPublicKey();
		assert.isTrue(result, "result is false");
		assert(public_key.length > 1000, "not a good public key length");
	});

	it('should require a passphrase', async function() {
		user.setPassphrase('');
		const result = await user.generateKey();
		user.setPassphrase('aGreatPhrase321!');
		assert.isFalse(result, "result is true");
		assert.equal(getLastConsoleMessage(), "passphrase is empty", "error messages do not match");
	});

	it('should require a phone', async function() {
		user.phone = '';
		const result = await user.generateKey();
		user.phone = '2125551212';
		assert.isFalse(result, "result is true");
		assert.equal(getLastConsoleMessage(), "phone is empty", "error messages do not match");
	});

	it('should require an email', async function() {
		user.email = '';
		const result = await user.generateKey();
		user.email = user.username+"@mailsac.com";
		assert.isFalse(result, "result is true");
		assert.equal(getLastConsoleMessage(), "email is empty", "error messages do not match");
	});
});

describe('registerUser', function() {
	beforeEach(function() {
		Minilog.backends.array.empty();
	});

	it('should create a user', async function() {
		user.name = 'test';
		user.username = 'test'+_.random(1111,9999); // random username
		user.email = user.username+"@mailsac.com";
		user.phone = '+12125551216';
		user.setPassphrase('aGreatPhrase321!');

		const result = await user.registerUser();
		assert.isTrue(result, "result is false\n\n"+getLastConsoleMessage());
	});

	it('should require a username', async function() {
		const previous_username = user.username;
		user.username = '';
		const result = await user.registerUser();
		user.username = previous_username;
		assert.isFalse(result, "result is true");
		assert.equal(getLastConsoleMessage(), "username is empty", "error messages do not match");
	});

	it('should require a passphrase', async function() {
		user.setPassphrase('');
		const result = await user.registerUser();
		user.setPassphrase('aGreatPhrase321!');
		assert.isFalse(result, "result is true");
		assert.equal(getLastConsoleMessage(), "passphrase is empty", "error messages do not match");
	});

	it('should catch aws failure', async function() {
		user.setPassphrase('insufficient');
		const result = await user.registerUser();
		user.setPassphrase('aGreatPhrase321!');
		assert.isFalse(result, "result is true");
		assert.match(getLastConsoleMessage(), /^InvalidPasswordException/, "error messages do not match");
	});

	it('should require a phone', async function() {
		user.phone = '';
		const result = await user.registerUser();
		user.phone = '+12125551212';
		assert.isFalse(result, "result is true");
		assert.equal(getLastConsoleMessage(), "phone is empty", "error messages do not match");
	});

	it('should require an email', async function() {
		user.email = '';
		const result = await user.registerUser();
		user.email = user.username+"@mailsac.com";
		assert.isFalse(result, "result is true");
		assert.equal(getLastConsoleMessage(), "email is empty", "error messages do not match");
	});

	it('should fail on already exists', async function() {
		const result = await user.registerUser();
		assert.isFalse(result, "result is true");
		assert.match(getLastConsoleMessage(), /^UsernameExistsException/, "error messages do not match");
	});
});

describe('login', function() {
	this.slow(30000);
	this.timeout(30000); // A very long environment setup.

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should login user', async function (done) {
		setTimeout(done, 30000);
		const test_user = await createAndConfirmUser();
		await sleep(1000); // sometimes the login comes too quick for the shard to see it
		const result = await test_user.login();
		assert.isTrue(result, "result is false\n\n"+getLastConsoleMessage());
		done();
	});

	it('should require a username', async function() {
		const old_username = user.username;
		user.username = '';
		const result = await user.login();
		user.username = old_username;
		assert.isFalse(result, "result is true");
		assert.equal(getLastConsoleMessage(), "username is empty", "error messages do not match");
	});

	it('should require a passphrase', async function() {
		const old_pw = user.getPassphrase();
		user.setPassphrase('');
		const result = await user.login();
		user.setPassphrase(old_pw);
		assert.isFalse(result, "result is true");
		assert.equal(getLastConsoleMessage(), "passphrase is empty", "error messages do not match");
	});

	it('should catch bad login', async function(done) {
		const old_pw = user.getPassphrase();
		user.setPassphrase('aFakedLogin1234!');
		const result = await user.login();
		user.setPassphrase(old_pw);
		assert.isFalse(result, "result is true");
		assert.match(getLastConsoleMessage(), /^NotAuthorizedException/, "error messages do not match\n\n"+getLastConsoleMessage());
		done();
	});
});

describe('verifyConfirmationCode', function() {
	this.slow(30000);
	this.timeout(30000); // A very long environment setup.

	// these sometimes have to be run by hand because it takes too long to get the email confirmation

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should confirm new user', async function (done) {
		setTimeout(done, 30000);
		await createAndConfirmUser();
		done();
	});

	it('should fail on random user', async function() {
		const random_user = new User();
		random_user.username = 'fake_username';
		const result = await random_user.verifyConfirmationCode('1234');
		assert.isFalse(result, "result is true");
		assert.match(getLastConsoleMessage(), /^UserNotFoundException/, "error messages do not match");
	});

	it('should fail on already confirmed user', async function() {
		const test_user = new User();
		test_user.username = 'a101';  // some confirmed user
		const result = await user.verifyConfirmationCode('1234');
		assert.isFalse(result, "result is true");
		assert.match(getLastConsoleMessage(), /user status is not UNCONFIRMED/, "error messages do not match");
	});

	it('should fail on wrong confirmation', async function() {
		// create a user
		const test_user = new User();
		test_user.name = 'test';
		test_user.username = 'test'+_.random(111111,999999); // random username
		test_user.email = user.username+'@mailsac.com';
		test_user.phone = '+12125551216';
		test_user.setPassphrase('aGreatPhrase321!');
		const register_result = await test_user.registerUser();
		assert.isTrue(register_result, "user create failed\n\n"+getLastConsoleMessage());

		const result = await test_user.verifyConfirmationCode('111');
		assert.isFalse(result, "result is true");
		assert.match(getLastConsoleMessage(), /^CodeMismatchException/, "error messages do not match");
	});
});

describe('resendConfirmationCode', function() {
	this.slow(30000);
	this.timeout(30000); // A very long environment setup.

	// these sometimes have to be run by hand because it takes too long to get the email confirmation

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should re-send confirmation', async function (done) {
		setTimeout(done, 30000);

		// create a user
		const test_user = new User();
		test_user.name = 'test';
		test_user.username = 'test' + _.random(111111, 999999); // random username
		test_user.email = user.username + '@mailsac.com';
		test_user.phone = '+12125551216';
		test_user.setPassphrase('aGreatPhrase321!');
		const register_result = await test_user.registerUser();
		assert.isTrue(register_result, "user create failed\n\n" + getLastConsoleMessage());

		test_user.resendConfirmationCode();

		let list = null;
		for (let i = 0; i < 29; i++) {
			await sleep(1000);

			// wait for 2 emails
			list = await getMailsacEmailList(test_user.email);
			if (list.length == 2) {
				logger.debug('2 emails found');
				break;
			}
			else {
				logger.debug('List length = '+list.length);
			}
		}

		assert(list.length==2, "list length not 2\n\n" + getLastConsoleMessage());

		done();
	});

	it('should fail on random user', async function() {
		const test_user = new User();
		test_user.username = 'fake_username';
		const result = await user.resendConfirmationCode();
		assert.isFalse(result, "result is true");
		assert.match(getLastConsoleMessage(), /^UserNotFoundException/, "error messages do not match");
	});

	it('should fail on already confirmed user', async function() {
		const test_user = new User();
		test_user.username = 'a101';  // some confirmed user
		const result = await test_user.resendConfirmationCode();
		assert.isFalse(result, "result is true");
		assert.match(getLastConsoleMessage(), /User is already confirmed/, "error messages do not match");
	});
});

describe('changeUserPassword', function() {
	this.slow(30000);
	this.timeout(30000); // A very long environment setup.

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should change a password', async function (done) {
		setTimeout(done, 30000);
		const test_user = await createAndConfirmUser();
		await sleep(3000);
		await test_user.login();
		await sleep(1000);
		const result = await test_user.changeUserPassword('aN#wPa$$12345?');
		assert.isTrue(result, "result is false\n\n" + getLastConsoleMessage());
		done();
	});

	it('should require a complex password', async function () {
		const test_user = new User();
		const result = await test_user.changeUserPassword('insufficient');
		assert.isFalse(result, "result is true");
	});
});

describe('updateUserAttribute', function() {
	this.slow(30000);
	this.timeout(30000); // A very long environment setup.

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should update an attribute', async function (done) {
		setTimeout(done, 30000);
		const test_user = await createAndConfirmUser();
		await sleep(3000);
		await test_user.login();
		await sleep(1000);

		const test_phone = '+1415222'+_.random(1111,9999);
		const result = await test_user.updateUserAttribute('phone_number',test_phone);
		assert.isTrue(result, "result is false\n\n" + getLastConsoleMessage());
		const actual = await test_user.getAwsUserAttributes();
		assert.equal(test_user.phone, test_phone);
		done();
	});

	it('should require a name', async function () {
		const test_user = new User();
		const result = await test_user.updateUserAttribute('','value');
		assert.isFalse(result, "result is true");
	});
});

describe('userForgotPassword', function() {
	this.slow(30000);
	this.timeout(30000); // A very long environment setup.

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should trigger a forgot pw email', async function (done) {
		setTimeout(done, 30000);
		const test_user = await createAndConfirmUser();
		await sleep(3000);
		const mail_count = await getMailsacEmailList(test_user.email);
		logger.debug('current mail count = '+mail_count);
		const result = await test_user.userForgotPassword();
		assert.isTrue(result, "result is false\n\n" + getLastConsoleMessage());

		let list = null;
		for (let i = 0; i < 29; i++) {
			await sleep(1000);

			// wait for 2 emails
			list = await getMailsacEmailList(test_user.email);
			if (list.length > mail_count.length) {
				logger.debug('new email found');
				break;
			}
			else {
				logger.debug('List length = '+list.length);
			}
		}

		assert(list.length > mail_count.length, "list doesn't have new mail\n\n" + getLastConsoleMessage());

		done();
	});

	it('should require a name', async function () {
		const test_user = new User();
		const result = await test_user.updateUserAttribute('','value');
		assert.isFalse(result, "result is true");
	});
});

describe('forgotPasswordReset', function() {
	this.slow(30000);
	this.timeout(30000); // A very long environment setup.

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should reset from forgot pw email', async function (done) {
		setTimeout(done, 30000);
		const test_user = await createAndConfirmUser();
		await sleep(3000);
		const mail_count = await getMailsacEmailList(test_user.email);
		logger.debug('current mail count = '+mail_count);
		const forgot_result = await test_user.userForgotPassword();
		assert.isTrue(forgot_result, "result is false\n\n" + getLastConsoleMessage());

		let list = null;
		for (let i = 0; i < 29; i++) {
			await sleep(1000);

			// wait for 2 emails
			list = await getMailsacEmailList(test_user.email);
			if (list.length > mail_count.length) {
				logger.debug('new email found');
				break;
			}
			else {
				logger.debug('List length = '+list.length);
			}
		}

		assert(list.length > mail_count.length, "list doesn't have new mail\n\n" + getLastConsoleMessage());

		const msg = await getLastMailsacEmail(test_user.email);
		let code = msg.body;
		const myregexp = /(\d{6})/i;
		let match = myregexp.exec(code);
		if (match != null) {
			code = match[1];
		}

		assert.equal(code.length, 6, 'cannot find 6 digit code');

		const reset_result = await test_user.forgotPasswordReset(code, 'Ch@^ge1234');
		assert.isTrue(reset_result, "result is false\n\n" + getLastConsoleMessage());

		done();
	});

	it('should catch from wrong number', async function () {
		const test_user = await createAndConfirmUser();

		const forgot_result = await test_user.userForgotPassword();
		assert.isTrue(forgot_result, "result is false\n\n" + getLastConsoleMessage());

		const reset_result = await test_user.forgotPasswordReset('000000', 'Ch@^ge1234');
		assert.isFalse(reset_result, "result is true\n\n" + getLastConsoleMessage());
		assert.match(getLastConsoleMessage(), /^CodeMismatchException/, "error messages do not match");
	});
});

describe('createUserQueue', function() {
	this.slow(30000);
	this.timeout(30000); // A very long environment setup.

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should create a queue', async function (done) {
		setTimeout(done, 30000);
		const test_user = await createConfirmLoginUser();
		await sleep(2000);
		const result = await test_user.createUserQueue();
		assert.isTrue(result, "result is false\n\n" + getLastConsoleMessage());
		done();
	});
});

describe('updatePublicKey', function() {
	this.slow(30000);
	this.timeout(30000); // A very long environment setup.

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should update a key', async function (done) {
		setTimeout(done, 30000);
		const test_user = await createConfirmLoginUser();
		await test_user.generateKey();
		const result = await test_user.updatePublicKey();
		assert.isTrue(result, "result is false\n\n" + getLastConsoleMessage());
		done();
	});
});

describe('setInStorage/getFromStorage', function() {

	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should store user data', async function () {
		let test_user = new User();
		test_user.username = 'test_user';
		test_user.awsSub = 'my aws sub';
		let result = await test_user.setInStorage();
		assert.isTrue(result, "result is false\n\n" + getLastConsoleMessage());
		let actual_user = new User();
		await actual_user.getFromStorage('test_user');
		assert.equal(actual_user.awsSub, 'my aws sub', 'loaded value does not match');
	});
});
