
function Message() {
	this.Username = '';
	this.Sender = 'me';
	this.Body = '';
	this.EncryptedBody = '';
	this.Signed = false;
	this.MessageId = '';
	this.ReceiptHandle = '';
	this.ReceiveDate = {};
	this.SentDate = {};
	this.MessageList = null;
	this.SendStatus = 'Unsent';

	this.toJSON = function()
	{
		return JSON.stringify({
			Username: this.Username,
			Sender: this.Sender,
			Body: this.Body,
			Signed: this.Signed,
			MessageId: this.MessageId,
			ReceiveDate: moment(this.ReceiveDate).format('YYYY-MM-DD HH:mm:ss'),
			SentDate: moment(this.SentDate).format('YYYY-MM-DD HH:mm:ss'),
			SendStatus: this.SendStatus
		});
	};

	this.fromJSONString = function(json_string, messagelist) {
		const data = JSON.parse(json_string);
		this.Username = data.Username;
		this.Sender = data.Sender;
		this.Body = data.Body;
		this.Signed = data.Signed;
		this.MessageId = data.MessageId;
		this.ReceiveDate = moment(data.ReceiveDate);
		this.MessageList = messagelist;
		this.SendStatus = data.SendStatus;
	};

	this.getEnvelope = function()
	{
		return JSON.stringify({
			Sender: current_user.user_id,
			Receiver: this.Username,
			Sent: moment().format("YYYY-MM-DD HH:mm:ss ZZ")
		});
	};
}