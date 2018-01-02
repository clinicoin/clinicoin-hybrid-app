function DataStorage() { }

localforage.config({
	name: 'ClinicoinApp'
});

/**
 * retrieve an item from storage
 * @param key
 * @returns item value or null if error
 */
DataStorage.prototype.getItem = async function(key, default_value)
{
	let value = default_value;
	try {
		value = await localforage.getItem(key);
		logger.debug("getItem: "+key+" = "+value);
	} catch (ex) {
		logger.error(ex);
		logger.warn('using default, '+key+" = "+value);
	}

	return value;
};

/**
 * sets an item in local storage
 * @param key
 * @param value
 * @returns true on success
 */
DataStorage.prototype.setItem = async function(key, value)
{
	try {
		logger.debug("setItem: "+key+" = "+value);
		await localforage.setItem(key, value);
		return true;
	} catch (ex) {
		logger.error(ex)
	}
	return false;
};

/**
 * remove an item from storage
 * @param key
 * @returns {Promise<boolean>}
 */
DataStorage.prototype.removeItem = async function(key)
{
	try {
		logger.debug("removeItem: "+key);
		await localforage.removeItem(key);
		return true;
	} catch (ex) {
		logger.error(ex)
	}
	return false;
};

DataStorage.prototype.removeItemsExpression = async function(expression)
{
	try {
		const self = this;
		let key_list = await localforage.keys();
		key_list = _.filter(key_list, key => expression.test(key));
		logger.debug("key count: "+key_list.length);

		for (let key of key_list) {
			await store.removeItem(key);
		}
	} catch (ex) {
		logger.error(ex)
	}
	return false;
};

DataStorage.prototype.getFilteredData = async function(expression, decode_json)
{
	const self = this;
	let key_list = await localforage.keys();
	//logger.debug(key_list);
	key_list = _.filter(key_list, key => expression.test(key));
	logger.debug("getKeys items: "+key_list.length);

	let data_list = [];
	for (let key of key_list) {
		let value = await store.getItem(key);
		if (decode_json === true) {
			value = JSON.parse(value);
		}
		data_list.push(value);
	}

	return data_list;
};