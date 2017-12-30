
function Message() {
	this.Username = '';
	this.Body = '';
	this.EncryptedBody = '';
	this.MessageId = '';
	this.ReceiptHandle = '';
	this.ReceiveDate = '';
	this.MessageList = null;

	this.toJSON = function()
	{
		return JSON.stringify({
			Username: this.Username,
			Body: this.Body,
			MessageId: this.MessageId,
			ReceiveDate: this.ReceiveDate
		});
	};

	this.fromJSONString = function(json_string, messagelist) {
		const data = JSON.parse(json_string);
		this.Username = data.Username;
		this.Body = data.Body;
		this.MessageId = data.MessageId;
		this.ReceiveDate = data.ReceiveDate;
		this.MessageList = messagelist;
	};
}