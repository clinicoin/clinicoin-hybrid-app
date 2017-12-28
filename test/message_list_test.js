const assert = chai.assert;

const msg_list = new MessageList();

describe('encryptMessage', function() {
	beforeEach(function () {
		Minilog.backends.array.empty();
	});

	it('should encrypt a message', function () {
		// load the public key
		msg_list.recipient_public_key = '';

		// load private key
		// encrypt message
	});
});