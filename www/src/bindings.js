const PAGE_LOGIN = 0;
const PAGE_REGISTER = 1;
const PAGE_RESET_PASSWORD = 2;
const PAGE_LOGIN_VERIFY = 3;
const PAGE_MAIN_LIST = 4;
const PAGE_MESSAGING = 5;
const PAGE_ADD_PROVIDER = 6;
const PAGE_SETTINGS = 7;

let current_message_list = null;

const setPageVisible = function(value)
{
	$('#tabbar').get(0).setActiveTab(value);
};

$(document).on('LoggedIn', function () {
	setInterval(()=>{
		channels.checkForMessages();
	},60000);
});

const bindLogin = function()
{
    logger.debug('Binding Login');

    $('#btnLogin').on('click', async function(e) {
	    current_user.username = $('#username').val().trim();
	    current_user.setAwsPassword( $('#password').val().trim() );

	    if (_.isEmpty(current_user.username)) {
		    ons.notification.toast({message: 'username cannot be empty', timeout: 2000});
		    return;
	    }

	    if (_.isEmpty(current_user.getAwsPassword())) {
		    ons.notification.toast({message: 'password cannot be empty', timeout: 2000});
		    return;
	    }

	    if (await current_user.login()) {
		    setPageVisible(PAGE_MAIN_LIST);
	    }
	    else {
		    ons.notification.toast({message: current_user.last_error_message, timeout: 2000});
	    }
    });
    
    $('#divForgot').on('click', function(e) {
	    const username = $('#username').val().trim();

	    if (_.isEmpty(username)) {
		    ons.notification.toast({message: 'username cannot be empty', timeout: 2000});
	    	return;
	    }

        ons.notification.confirm({
            message: 'Really reset your password?',
            callback: function(result) {
                if (result) {
                	current_user.username = username;
	                current_user.userForgotPassword();
                    ons.notification.toast({message: 'Password reset message sent', timeout: 2000});
	                setPageVisible(PAGE_RESET_PASSWORD);
                }
            }
        });
    });
    
    $('#divRegister').on('click', function(e) {
        setPageVisible(PAGE_REGISTER);
    });
};

const bindRegister = function()
{
    logger.debug('Binding Register');
    
    $('#btnBackRegister').on('click', function(){
        setPageVisible(PAGE_LOGIN);
    });
    
    $('#btnRegister').on('click', function(){
	    current_user.email = $('#reg_email').val().trim();
	    current_user.phone = $('#reg_phone').val().trim();
	    current_user.username = $('#reg_username').val().trim();
	    current_user.setAwsPassword($('#reg_password').val().trim());
	    const password = $('#reg_password').val().trim();
	    const confirm = $('#reg_confirm').val().trim();

	    if (_.isEmpty(current_user.username)) {
		    ons.notification.toast({message: 'username cannot be empty', timeout: 2000});
		    return;
	    }

	    if (password !== confirm) {
		    ons.notification.toast({message: 'password and confirmation do not match', timeout: 2000});
		    return;
	    }

	    if ( ! current_user.isComplexPassword(password)) {
		    alert('Password is not sufficiently complex. It requires at least 8 letters, upper and lower case, numbers, and non-letter/number characters.');
		    return;
	    }

	    const result = current_user.registerUser();
	    if (result) {
		    ons.notification.toast({message: 'User registered, verfication sent', timeout: 2000});

		    setPageVisible(PAGE_LOGIN_VERIFY);

		    $('#password').val(password);
	    }
	    else {
		    ons.notification.toast({message: current_user.last_error_message, timeout: 2000});
	    }
    });
};

const bindResetPassword = function()
{
	logger.debug('Binding Reset Password');

	$('#btnBackResetPassword').on('click', function(){
		setPageVisible(PAGE_LOGIN);
	});

	$('#btnReset').on('click', async function(){
		const password = $('#reset_password').val().trim();
		const confirm = $('#reset_confirm').val().trim();
		const code = $('#reset_code').val().trim();

		if (_.isEmpty(code)) {
			ons.notification.toast({message: 'code cannot be empty', timeout: 2000});
			return;
		}

		if (_.isEmpty(password)) {
			ons.notification.toast({message: 'password cannot be empty', timeout: 2000});
			return;
		}

		if (password !== confirm) {
			ons.notification.toast({message: 'password and confirmation do not match', timeout: 2000});
			return;
		}

		if ( ! current_user.isComplexPassword(password)) {
			alert('Password is not sufficiently complex. It requires at least 8 letters, upper and lower case, numbers, and non-letter/number characters.');
			return;
		}

		const result = await current_user.forgotPasswordReset(code, password);
		if (result) {
			ons.notification.toast({message: 'Password reset successful', timeout: 2000});

			// try to log them in
			setPageVisible(PAGE_LOGIN);
			$('#password').val(password);
			$('#btnLogin').click();
		}
		else {
			alert("Reset Failed: "+current_user.last_error_message);
		}
	});
};

const bindLoginVerify = function()
{
	logger.debug('Binding Login Verification');

	$('#btnBackLoginVerification').on('click', function(){
		setPageVisible(PAGE_LOGIN);
	});

	$('#btnConfirmCode').on('click', async function(){
		const code = $('#login_code').val().trim();

		if (_.isEmpty(code)) {
			ons.notification.toast({message: 'code cannot be empty', timeout: 2000});
			return;
		}

		const result = await current_user.verifyConfirmationCode(code);
		if (result) {
			ons.notification.toast({message: 'Code confirmation successful', timeout: 2000});

			// try to log them in
			setPageVisible(PAGE_LOGIN);
			$('#btnLogin').click();
		}
		else {
			alert("Verify Failed: "+current_user.last_error_message);
		}
	});

	$('#divResendConfirmation').on('click', async function(){
		const result = await current_user.resendConfirmationCode();
		if (result) {
			ons.notification.toast({message: 'Code confirmation re-sent', timeout: 2000});
		}
		else {
			ons.notification.toast({message: 'Resend Failed: '+current_user.last_error_message, timeout: 2000});
		}
	});
};

const bindMainList = function()
{
    logger.debug('Binding Main List');
    channels.getChannels();
    // show the channel list
    
    // making a generic forward to messages
    $('#servicelist').find('ons-list-item').on('click', function(event){
        setPageVisible(PAGE_MESSAGING);

        const channel_name = $(event.target).attr('channel_name');
        current_message_list = channels.findByUsername(channel_name);
    });
    
    $('#btnAddProvider').on('click', function(){
        setPageVisible(PAGE_ADD_PROVIDER);
    });
    
    $('#btnSettings').on('click', function(){
        setPageVisible(PAGE_SETTINGS);
    });
};

const bindMessaging = function()
{
    logger.debug('Binding Messaging');
    
    $('#btnBackMsg').on('click', function(){
        setPageVisible(PAGE_MAIN_LIST);
    });
    
    $('#btnRemove').on('click', function(){
        ons.notification.confirm({
            message: 'Really delete provider?',
            callback: function(result) {
                if (result) {
                    ons.notification.toast({message: 'Service provider removed', timeout: 2000});
                    setPageVisible(PAGE_MAIN_LIST);
                }
            }
        });
    });
    
    $('#btnSendMsg').on('click', function(){
        ons.notification.toast({message: 'Message sent', timeout: 2000});
    });
};

const bindAddProvider = function()
{
    logger.debug('Binding Add Provider');
    
    $('#btnBackAddProvider').on('click', function(){
        setPageVisible(PAGE_MAIN_LIST);
    });
    
    $('#addlist').find('ons-list-item').on('click', function(evt){
        ons.notification.toast({message: 'Service provider added', timeout: 2000});
    });
};

const bindSettings = function()
{
    logger.debug('Binding Settings');
    
    $('#btnBackSettings').on('click', function(){
        setPageVisible(PAGE_MAIN_LIST);
    });
    
    $('#btnPasswordUpdate').on('click', function(){
        ons.notification.toast({message: 'Password Updated', timeout: 2000});
    });
};