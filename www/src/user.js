const CLIENT_ID = '2s5fg9tumemtjm22lb7pup8l30';
const USER_POOL_ID = 'us-east-1_QCQ5kVlpW';

function User() {
    this.username = '';
    this.user_id = '';
	this.email = '';
	this.phone = '';
	this.name = '';
	this.last_error_code = '';
	this.last_error_message = '';

	let passphrase = '';
    let private_key = '';
    let public_key = '';

	this.getPassphrase = function()
	{
		return passphrase;
	};

	this.setPassphrase = function(new_passphrase)
	{
		passphrase = new_passphrase;
	};

    this.getPublicKey = function()
    {
    	return public_key;
    };

	this.setPublicKey = function(new_key)
	{
		public_key = new_key;
	};

	this.getPrivateKey = function()
	{
		return private_key;
	};

	this.setPrivateKey = function(new_key)
	{
		private_key = new_key;
	};
}

/**
 * Generate a PGP for use, setting to the private properties
 * @returns true on success
 */
User.prototype.generateKey = async function()
{
	logger.info('generating new key');

	if (_.isEmpty(this.email)) {
		logger.error('email is empty');
		return false;
	}

	if (_.isEmpty(this.phone)) {
		logger.error('phone is empty');
		return false;
	}

	if (_.isEmpty(this.getPassphrase())) {
		logger.error('passphrase is empty');
		return false;
	}

    const options = {
        userIds: [ {
            name: this.name,
            email: this.email,
            phone: this.phone
        } ], // multiple user IDs
        numBits: 2048,                // RSA key size
        passphrase: this.getPassphrase()        // protects the private key
    };

    const key_object = await openpgp.generateKey(options);
    this.setPrivateKey(key_object.privateKeyArmored);
    this.setPublicKey(key_object.publicKeyArmored);

	logger.info('key return success');
	logger.debug('private: '+key_object.privateKeyArmored);
	logger.debug('public: '+key_object.publicKeyArmored);

    return true;
};

/**
 * register a new user with the system
 * @returns true on success
 */
User.prototype.registerUser = async function()
{
	logger.info('Registering new user');

	if (_.isEmpty(this.email)) {
		logger.error('email is empty');
		return false;
	}

	if (_.isEmpty(this.phone)) {
		logger.error('phone is empty');
		return false;
	}

	if (this.phone.length == 10 && ! _.startsWith(this.phone, '+')) {
		// assume it's a NADP number
		this.phone = '+1'+this.phone;
	}
	else if (this.phone.length == 11 && ! _.startsWith(this.phone, '+')) {
		this.phone = '+'+this.phone;
	}

	if (_.isEmpty(this.getPassphrase())) {
		logger.error('passphrase is empty');
		return false;
	}

	if (_.isEmpty(this.username)) {
		logger.error('username is empty');
		return false;
	}

	let poolData = {
		UserPoolId : USER_POOL_ID,
		ClientId : CLIENT_ID
	};
	let userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

	let attributeList = [];

	const attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({ Name : 'email', Value : this.email });
	attributeList.push(attributeEmail);

	const attributePhoneNumber = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({ Name : 'phone_number', Value : this.phone });
	attributeList.push(attributePhoneNumber);

	const signup_promise = new Promise((resolve) =>
		userPool.signUp(this.username, this.getPassphrase(), attributeList, null, (err, result) => {
			if (err) {
				resolve({ error: err });
			}
			else {
				resolve(result.user);
			}
		})
	);

	const result = await signup_promise;

	if (result.error) {
		logger.error(result.error.code + " - " + result.error.message);
		this.last_error_code = result.error.code;
		this.last_error_message = result.error.message;
		return false;
	}
	else {
		logger.info('cognito user: ' + result.getUsername());
		return true;
	}
};

/**
 * login a confirmed user
 * @returns true on success
 */
User.prototype.login = async function()
{
	logger.info('user aws login');

	if (_.isEmpty(this.getPassphrase())) {
		logger.error('passphrase is empty');
		return false;
	}

	if (_.isEmpty(this.username)) {
		logger.error('username is empty');
		return false;
	}

	const authenticationData = {
		Username : this.username,
		Password : this.getPassphrase()
	};

	let authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

	let poolData = {
		UserPoolId : USER_POOL_ID,
		ClientId : CLIENT_ID
	};
	let userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
	let userData = {
		Username : this.username,
		Pool : userPool
	};
	let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
	const auth_promise = new Promise((resolve) =>
		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: async function (result) {
				logger.info('auth success');
				//logger.debug('access token + ' + result.getAccessToken().getJwtToken());

				//POTENTIAL: Region needs to be set if not already set previously elsewhere.
				AWS.config.region = 'us-east-1';

				AWS.config.credentials = new AWS.CognitoIdentityCredentials({
					IdentityPoolId: 'us-east-1:d94bc2ab-8203-4105-9013-4cffe559f6ad', // your identity pool id here
					Logins: {
						// Change the key below according to the specific region your user pool is in.
						'cognito-idp.us-east-1.amazonaws.com/us-east-1_QCQ5kVlpW': result.getIdToken().getJwtToken()
					}
				});

				logger.debug('refresh aws credentials');

				//refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
				const refresh_promise = new Promise((resolve) => {
					AWS.config.credentials.refresh((error) => {
						if (error) {
							resolve({error:error});
						} else {
							console.log('Successfully logged!');
							resolve({});
						}
					});
				});

				const refresh_result = await refresh_promise;
				if (refresh_result.error) {
					resolve({error:refresh_result.error});
				}

				logger.debug('refresh success');

				resolve({});
			},
			onFailure: function (err) {
				resolve({ error: err });
			}
		})
	);

	const result = await auth_promise;

	if (result.error) {
		logger.error(result.error.code + " - " + result.error.message);
		this.last_error_code = result.error.code;
		this.last_error_message = result.error.message;
		return false;
	}
	else {
		logger.info('login success');
		return true;
	}
};


/**
 * touch the credentials on AWS to refresh
 * @returns true on success
 */
User.prototype.verifyConfirmationCode = async function(confirmation_code)
{
	logger.info('confirming user code');

	let poolData = {
		UserPoolId : USER_POOL_ID,
		ClientId : CLIENT_ID
	};
	let userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

	let userData = {
		Username : this.username,
		Pool : userPool
	};

	let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

	const verify_promise = new Promise((resolve) => {
		cognitoUser.confirmRegistration(confirmation_code, true, function(error, result) {
			if (error) {
				resolve({error:error});
			} else {
				resolve({ data: result });
			}
		});
	});

	const result = await verify_promise;
	if (result.error) {
		logger.error(result.error.code + " - " + result.error.message);
		this.last_error_code = result.error.code;
		this.last_error_message = result.error.message;
		return false;
	}
	else {
		logger.info('result: '+result.data);
		return true;
	}
};

/**
 * resend the confirmation code email/sms
 * @returns true on success
 */
User.prototype.resendConfirmationCode = async function()
{
	logger.info('re-sending user code');

	let poolData = {
		UserPoolId : USER_POOL_ID,
		ClientId : CLIENT_ID
	};
	let userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
	let userData = {
		Username : this.username,
		Pool : userPool
	};
	let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

	const resend_promise = new Promise((resolve) => {
		cognitoUser.resendConfirmationCode(function(error) {
			if (error) {
				resolve({error:error});
			} else {
				resolve({});
			}
		});
	});

	const result = await resend_promise;
	if (result.error) {
		logger.error(result.error.code + " - " + result.error.message);
		this.last_error_code = result.error.code;
		this.last_error_message = result.error.message;
		return false;
	}
	else {
		logger.info('resend success');
		return true;
	}
};

User.prototype.callLambda = async function(invoke_params)
{
	logger.info('calling lambda');

	const lambda = new AWS.Lambda({region: 'us-east-1', apiVersion: '2015-03-31'});

	const lambda_promise = new Promise((resolve) => {
		lambda.invoke(invoke_params, function(err, data) {
			if (err) {
				resolve({error:err});
			} else {
				resolve({data:data});
			}
		});
	});

	const result = await lambda_promise;
    if (result.error) {
	    logger.error(result.error.code + " - " + result.error.message);
	    this.last_error_code = result.error.code;
	    this.last_error_message = result.error.message;
	    return false;
    }
    else {
	    logger.info('lambda success');
	    return true;
    }
};

User.prototype.test4Lambda = async function()
{
	logger.info('calling test4lambda');

	return this.callLambda({
		FunctionName : 'cloud9-test4-test4-KORTFFROPJ1Y',
		InvocationType : 'RequestResponse',
		LogType : 'None'
	});
};

/*
TODO:
and an entry is created in the directory
and a queue is created for the user
and the user is given read/write rights to the queue
and the queue receives a welcome message from the directory
 */