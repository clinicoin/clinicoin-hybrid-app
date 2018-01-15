
function Activity()
{
	this.Id = moment().format('x');
	this.ActivityDate = moment().format('YYYY-MM-DD HH:mm:ss');
	this.ActivityType = '';
	this.Units = '';
	this.Amount = 0;

	this.toJSON = function()
	{
		return JSON.stringify({
			Id: this.Id,
			ActivityDate: moment(this.ActivityDate).format('YYYY-MM-DD HH:mm:ss'),
			ActivityType: this.ActivityType,
			Units: this.Units,
			Amount: this.Amount
		});
	};

	this.fromJSONString = function(json_string)
	{
		const data = JSON.parse(json_string);
		this.Id = data.Id;
		this.ActivityDate = moment(data.ActivityDate);
		this.ActivityType = data.ActivityType;
		this.Units = data.Units;
		this.Amount = data.Amount;
	};

	this.getActivityLine = function()
	{
		return this.ActivityType+' for '+ this.Amount + ' ' +this.Units;
	};

	this.getFriendlyTime = function()
	{
		return moment(this.ActivityDate).fromNow();
	};
}