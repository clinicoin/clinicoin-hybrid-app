/**
 * retrieves the last console message from Minilog
 * @returns message array
 */
const getLastConsoleMessage = function()
{
	const msg = _.last(Minilog.backends.array.get());
	return _.last(msg[2]); // array 1 is type, 2 is the text (and is an array)
};

/**
 * simple function to sleep
 * @param ms
 * @returns {Promise<any>}
 * @example await sleep(2000)
 */
const sleep = function(ms)
{
	return new Promise(resolve => setTimeout(resolve, ms));
};

const getMailsacEmailList = async function(email_address)
{
	// get the list
	let ax_list_promise = null;
	try {
		ax_list_promise = await axios.get('https://mailsac.com/api/addresses/'+email_address+'/messages?_mailsacKey='+MAILSAC_API_KEY);
	} catch(e) {
		return logger.error(e);
	}

	return ax_list_promise.data;
};

/**
 * get the last message from Mailsac.com
 * @param email_address
 * @returns {Promise<void>}
 */
const getLastMailsacEmail = async function(email_address)
{
	let list_response = await getMailsacEmailList(email_address);

	if (list_response.length === 0) {
		logger.debug('no emails');
		return null;
	}
	const msg_id = _.last(list_response)._id;

	// get the individual message
	let ax_msg_promise = null;
	try {
		ax_msg_promise = await axios.get('https://mailsac.com/api/addresses/'+email_address+'/messages/'+msg_id+'?_mailsacKey='+MAILSAC_API_KEY);
	} catch(e) {
		return logger.error(e);
	}

	let message = ax_msg_promise.data;

	// get the message body
	let ax_body_promise = null;
	try {
		ax_body_promise = await axios.get('https://mailsac.com/api/text/'+email_address+'/'+msg_id+'?_mailsacKey='+MAILSAC_API_KEY);
	} catch(e) {
		return logger.error(e);
	}

	message.body = ax_body_promise.data;

	return message;
};