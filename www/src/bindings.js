
const setPageVisible = function(value)
{
	logger.info('setting tab to '+value);
	$('#tabbar').get(0).setActiveTab(value);
};

const getPageVisible = function()
{
	const value = $('#tabbar').get(0).getActiveTabIndex();
	logger.debug('tab value = '+value);
	return value;
};
/*
$(document).on('LoggedIn', function () {
	setInterval(()=>{
		channels.checkForMessages();
	},60000);
});
*/



const bindRegisterVerify = function()
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
			ons.notification.toast({message: "Verify Failed: "+current_user.last_error_message, timeout: 2000});
		}
	});

	$('#divResendConfirmation').on('click', async function(){
		const result = await current_user.resendConfirmationCode();
		if (result) {
			ons.notification.toast({message: 'Registration confirmation code re-sent', timeout: 2000});
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
        setPageVisible(PAGE_CONNECT);
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






















