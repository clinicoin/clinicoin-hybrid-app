
var setPageVisible = function(value)
{
    $('#tabbar').get(0).setActiveTab(value);
};

var bindLogin = function()
{
    logger.debug('Binding Login');

    $('#btnLogin').on('click', function(e) {
        setPageVisible(2);
    });
    
    $('#divForgot').on('click', function(e) {
        // show a dialog asking to send message
        // this sort of function should not be here
        ons.notification.confirm({
            message: 'Really reset your password?',
            callback: function(result) {
                if (result) {
                    ons.notification.toast({message: 'Password reset message sent', timeout: 2000});
                }
            }
        });
    });
    
    $('#divRegister').on('click', function(e) {
        setPageVisible(1);
    });
};

var bindRegister = function()
{
    logger.debug('Binding Register');
    
    $('#btnBackRegister').on('click', function(){
        setPageVisible(0);
    });
    
    $('#btnRegister').on('click', function(){
        ons.notification.toast({message: 'User registered', timeout: 2000});
        setPageVisible(2);
    });
};

var bindMainList = function()
{
    logger.debug('Binding Main List');
    
    // making a generic forward to messages
    $('#servicelist').find('ons-list-item').on('click', function(){
        setPageVisible(3);
    });
    
    $('#btnAddProvider').on('click', function(){
        setPageVisible(4);
    });
    
    $('#btnSettings').on('click', function(){
        setPageVisible(5);
    });
};

var bindMessaging = function()
{
    logger.debug('Binding Messaging');
    
    $('#btnBackMsg').on('click', function(){
        setPageVisible(2);
    });
    
    $('#btnRemove').on('click', function(){
        ons.notification.confirm({
            message: 'Really delete provider?',
            callback: function(result) {
                if (result) {
                    ons.notification.toast({message: 'Service provider removed', timeout: 2000});
                    setPageVisible(2);
                }
            }
        });
    });
    
    $('#btnSendMsg').on('click', function(){
        ons.notification.toast({message: 'Message sent', timeout: 2000});
    });
};

var bindAddProvider = function()
{
    logger.debug('Binding Add Provider');
    
    $('#btnBackAddProvider').on('click', function(){
        setPageVisible(2);
    });
    
    $('#addlist').find('ons-list-item').on('click', function(evt){
        ons.notification.toast({message: 'Service provider added', timeout: 2000});
    });
};

var bindSettings = function()
{
    logger.debug('Binding Settings');
    
    $('#btnBackSettings').on('click', function(){
        setPageVisible(2);
    });
    
    $('#btnPasswordUpdate').on('click', function(){
        ons.notification.toast({message: 'Password Updated', timeout: 2000});
    });
};