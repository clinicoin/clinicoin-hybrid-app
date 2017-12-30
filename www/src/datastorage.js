localforage.config({
	name: 'ClinicoinApp'
});

function DataStorage() { }

/**
 * retrieve an item from storage
 * @param key
 * @returns item value or null if error
 */
DataStorage.prototype.getItem = async function(key)
{
	try {
		return await localforage.getItem(key);
	} catch (ex) {
		logger.error(ex)
	}

	return null;
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
		await localforage.removeItem(key, value);
		return true;
	} catch (ex) {
		logger.error(ex)
	}
	return false;
};

DataStorage.prototype.getDictionaryValues = function(expression)
{
	let _list = [];
	localforage.iterate(function(value, key, iterationNumber) {
		if (expression.test(key)) {
			_list.push({ key:key, value:value });
		}
	});
	logger.debug("getKeys items: "+_list.length);
	return _list;
};