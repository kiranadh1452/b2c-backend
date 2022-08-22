const NodeCache = require("node-cache");
const myCache = new NodeCache();

/**
 * Function to cache OTP for a user
 * @param {String} category - category of the data being cached | `New user`, `Reset Password`, `Delete Account`
 * @param {String} identifier - unique identifier of the user
 * @param {String} data - data to be cached
 * @return {Boolean} - true if OTP is cached successfully else false
 */
const setCache = (category, identifier, data) => {
    try {
        const key = `${category}+${identifier}`;
        const success = myCache.set(key, data, 1000000);
        return success;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Function to get cached data for a user
 * @param {String} category - category of the data being cached | `New user`, `Reset Password`, `Delete Account`
 * @param {String} identifier - unique identifier of the user
 * @return {String} - cached data if found else null
 */
const getCache = (category, identifier) => {
    try {
        const key = `${category}+${identifier}`;
        value = myCache.get(key);
        return value;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    setCache,
    getCache,
};
