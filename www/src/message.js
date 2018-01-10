
function Message() {
	this.Sender = 'me';
	this.Body = '';
	this.EncryptedBody = '';
	this.Signed = false;
	this.MessageId = moment().format('x');
	this.ReceiptHandle = '';
	this.ReceiveDate = {};
	this.SentDate = {};
	this.SendStatus = 'Unsent';
	this.ReadDate = {};

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
			ReadDate: moment(this.ReadDate).format('YYYY-MM-DD HH:mm:ss'),
			SendStatus: this.SendStatus
		});
	};

	this.fromJSONString = function(json_string) {
		const data = JSON.parse(json_string);
		this.Username = data.Username;
		this.Sender = data.Sender;
		this.Body = data.Body;
		this.Signed = data.Signed;
		this.MessageId = data.MessageId;
		this.ReceiveDate = moment(data.ReceiveDate);
		this.SentDate = moment(data.SentDate);
		this.ReadDate = data.ReadDate;
		this.SendStatus = data.SendStatus;
	};

	this.getEnvelope = function()
	{
		return JSON.stringify({
			Sender: this.Sender,
			Receiver: this.Receiver,
			Sent: moment().toISOString()
		});
	};

	this.isRead = function()
	{
		return this.ReadDate !== {};
	};

	this.getFriendlyTime = function()
	{
		return moment(this.SentDate).fromNow();
	}
}