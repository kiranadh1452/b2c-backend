const crypto = require("crypto");
require("dotenv").config({ path: "../config/.env" });

/**
 * Method to authenticate the password with hash
 * @param {String} password - password to authenticate
 * @param {String} hashValue - hash value to authenticate
 * @param {String} salt - salt used to authenticate
 * @return {Boolean} - true if password is correct, false otherwise
 */
const authenticate = (password, salt, hashValue) => {
    const newEncrypt = encryptPasswordFunc(password, salt);
    return newEncrypt === hashValue;
};

/**
 * Method to encrypt the password
 * @param {String} password - password to encrypt
 * @return {String} - encrypted password
 */
const encryptPasswordFunc = (password, salt) => {
    if (!password) return "";
    // use a global secret salt and a user specific random salt to hash the password
    const encryptWith = process.env.SECRET_SALT + salt;
    try {
        return crypto
            .createHmac("sha256", encryptWith)
            .update(password)
            .digest("hex");
    } catch (err) {
        console.log(err);
    }
};

/**
 * Function to create a salt using current date and random number
 * @return {String} - salt
 */
const makeSalt = () => {
    const salt = Math.round(new Date().valueOf() * Math.random()) + "";
    return salt;
};

module.exports = {
    authenticate,
    encryptPasswordFunc,
    makeSalt,
};
