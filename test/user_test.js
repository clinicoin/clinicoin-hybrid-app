const assert = chai.assert;

let user = new User();
user.name = 'joe';
user.username = 'joe2125551217';
user.email = 'me@them.com';
user.phone = '+12125551217';
user.setPassphrase('aGreatPhrase321!');

/*
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
		user.setPassphrase('aGreatPhrase321');
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
		user.email = 'me@them.com';
		assert.isFalse(result, "result is true");
		assert.equal(getLastConsoleMessage(), "email is empty", "error messages do not match");
	});
});

describe('registerUser', function() {
	beforeEach(function() {
		Minilog.backends.array.empty();
	});

	it('should create a user', async function() {
		user.name = 'joe';
		user.username = 'joe'+_.random(1111,9999); // random username
		user.email = 'me@them.com';
		user.phone = '+12125551216';
		user.setPassphrase('aGreatPhrase321!');

		const result = await user.registerUser();
		assert.isTrue(result, "result is false\n\n"+getLastConsoleMessage());
	});

	it('should require a username', async function() {
		user.username = '';
		const result = await user.registerUser();
		user.username = 'joe2125551216';
		assert.isFalse(result, "result is true");
		assert.equal(getLastConsoleMessage(), "username is empty", "error messages do not match");
	});

	it('should require a passphrase', async function() {
		user.setPassphrase('');
		const result = await user.registerUser();
		user.setPassphrase('aGreatPhrase321');
		assert.isFalse(result, "result is true");
		assert.equal(getLastConsoleMessage(), "passphrase is empty", "error messages do not match");
	});

	it('should catch aws failure', async function() {
		user.setPassphrase('insufficient');
		const result = await user.registerUser();
		user.setPassphrase('aGreatPhrase321');
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
		user.email = 'me@them.com';
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
	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should login user', async function () {
		const result = await user.login();
		assert.isTrue(result, "result is false\n\n"+getLastConsoleMessage());
	});

	it('should require a username', async function() {
		user.username = '';
		const result = await user.login();
		user.username = 'joe2125551216';
		assert.isFalse(result, "result is true");
		assert.equal(getLastConsoleMessage(), "username is empty", "error messages do not match");
	});

	it('should require a passphrase', async function() {
		user.setPassphrase('');
		const result = await user.login();
		user.setPassphrase('aGreatPhrase321');
		assert.isFalse(result, "result is true");
		assert.equal(getLastConsoleMessage(), "passphrase is empty", "error messages do not match");
	});

	it('should catch bad login', async function() {
		user.setPassphrase('wrong_password!123');
		const result = await user.login();
		user.setPassphrase('aGreatPhrase321');
		assert.isFalse(result, "result is true");
		assert.match(getLastConsoleMessage(), /^NotAuthorizedException/, "error messages do not match\n\n"+getLastConsoleMessage());
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

		// create a user
		user.name = 'joe';
		user.username = 'joe'+_.random(111111,999999); // random username
		user.email = user.username+'@mailsac.com';
		user.phone = '+12125551216';
		user.setPassphrase('aGreatPhrase321!');
		const register_result = await user.registerUser();
		assert.isTrue(register_result, "user create failed\n\n"+getLastConsoleMessage());

		let code = '';
		for(let i=0; i < 29; i++) {
			await sleep(1000);

			// get the code
			const msg = await getLastMailsacEmail(user.email);
			if (msg != null) {
				code = msg.body;
				const myregexp = /(\d{6})/i;
				let match = myregexp.exec(code);
				if (match != null) {
					code = match[1];
					break;
				}
			}
		}

		const result = await user.verifyConfirmationCode(code);
		assert.isTrue(result, "result is false\n\n" + getLastConsoleMessage());
		done();
	});

	it('should fail on random user', async function() {
		user.username = 'fake_username';
		const result = await user.verifyConfirmationCode('1234');
		assert.isFalse(result, "result is true");
		assert.match(getLastConsoleMessage(), /^UserNotFoundException/, "error messages do not match");
	});

	it('should fail on already confirmed user', async function() {
		user.username = 'a101';  // some confirmed user
		const result = await user.verifyConfirmationCode('1234');
		assert.isFalse(result, "result is true");
		assert.match(getLastConsoleMessage(), /user status is not UNCONFIRMED/, "error messages do not match");
	});

	it('should fail on wrong confirmation', async function() {
		// create a user
		user.name = 'joe';
		user.username = 'joe'+_.random(111111,999999); // random username
		user.email = user.username+'@mailsac.com';
		user.phone = '+12125551216';
		user.setPassphrase('aGreatPhrase321!');
		const register_result = await user.registerUser();
		assert.isTrue(register_result, "user create failed\n\n"+getLastConsoleMessage());

		const result = await user.verifyConfirmationCode('111');
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

	/*
	it('should re-send confirmation', async function (done) {
		setTimeout(done, 30000);

		// create a user
		user.name = 'joe';
		user.username = 'joe' + _.random(111111, 999999); // random username
		user.email = user.username + '@mailsac.com';
		user.phone = '+12125551216';
		user.setPassphrase('aGreatPhrase321!');
		const register_result = await user.registerUser();
		assert.isTrue(register_result, "user create failed\n\n" + getLastConsoleMessage());

		user.resendConfirmationCode();

		let list = null;
		for (let i = 0; i < 29; i++) {
			await sleep(1000);

			// wait for 2 emails
			list = await getMailsacEmailList(user.email);
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
		user.username = 'fake_username';
		const result = await user.resendConfirmationCode();
		assert.isFalse(result, "result is true");
		assert.match(getLastConsoleMessage(), /^UserNotFoundException/, "error messages do not match");
	});

	it('should fail on already confirmed user', async function() {
		user.username = 'a101';  // some confirmed user
		const result = await user.resendConfirmationCode();
		assert.isFalse(result, "result is true");
		assert.match(getLastConsoleMessage(), /User is already confirmed/, "error messages do not match");
	});
});
	*/