
function Activity()
{
	this.Id = moment().format('x');
	this.ServerId = '';
	this.ActivityDate = moment().format('YYYY-MM-DD HH:mm:ss');
	this.ActivityType = '';
	this.Units = '';
	this.Amount = 0;
	this.Award = 0;

	this.toJSON = function()
	{
		return JSON.stringify({
			Id: this.Id,
			ActivityDate: moment(this.ActivityDate).format('YYYY-MM-DD HH:mm:ss'),
			ActivityType: this.ActivityType,
			Units: this.Units,
			Amount: this.Amount,
			Award: this.Award,
			ServerId: this.ServerId
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
		this.Award = data.Award;
		this.ServerId = data.ServerId;
	};

	this.getActivityLine = function()
	{
		if (this.Award > 0) {
			return this.ActivityType+' for '+ this.Amount + ' ' +this.Units + ' (' + this.Award + ' coins)';
		}
		return this.ActivityType+' for '+ this.Amount + ' ' +this.Units;
	};

	this.getFriendlyTime = function()
	{
		return moment(this.ActivityDate).fromNow();
	};

	this.save = async function()
	{
		await this.sendToServer();
		await this.saveLocal();
	};

	this.saveLocal = async function()
	{
		await store.setItem('act_'+current_user.username+'_'+this.Id, this.toJSON());
	};

	this.sendToServer = async function()
	{
		axios.defaults.headers.post['Content-Type'] = 'json';

		const data = {
			'Id': this.Id,
			'Date': this.ActivityDate,
			'Description': this.ActivityType,
			'Amount': this.Amount,
			'Units': this.Units
		};

		const full_phone = current_user.country_code.code + current_user.phone;
		const result = await axios.post(CLINTOKEN_SITE+'/api/activity/'+full_phone, data);

		if (result.data.status == 200) {
			this.ServerId = result.data.activity_id;
			current_user.last_error_message = '';
		}
		else {
			current_user.last_error_message = result.data.description;
		}
	};

	this.getDistributions = async function()
	{
		const full_phone = current_user.country_code.code + current_user.phone;
		const result = await axios.get(CLINTOKEN_SITE+'/api/activity/distribution/'+full_phone);

		if (result.data.status == 200) {
			current_user.last_error_message = '';
		}
		else {
			current_user.last_error_message = result.data.description;
			return;
		}

		local_list = await this.getActivites();

		// update the item list with distribution amounts
		for (let server_act of result.data.activities) {
			const local_act = _.find(local_list, {"Id":server_act.user_activity_id});
			if ( ! _.isEmpty(local_act)) {
				local_act.Award = server_act.award_amount;
				local_act.saveLocal();
			}
		}

		return result.status == 200;
	};

	this.getActivites = async function()
	{
		logger.info('loading activities');

		let activities = [];
		const exp = new RegExp('^act_'+current_user.username+'_[a-f0-9]+', 'i');
		const key_list = await store.getFilteredData(exp);
		key_list.forEach(async function(json) {
			const act = new Activity();
			act.fromJSONString(json);
			activities.push(act);
		});

		activities = _.sortBy(activities, ['ActivityDate']);

		return activities;
	}
}