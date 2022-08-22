/**
 * Function to generate a random OTP
 * @oaram {Number} length - length of the OTP
 * @return {String} - OTP
 */
const generateOtp = (length = 6) => {
    const chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let otp = "";

    for (let i = 0; i < length; i++) {
        otp += chars[getRandomInt(0, chars.length)];
    }
    return otp;
};

/**
 * Function to generate a random integer between min and max
 * @param {Number} min - minimum value (inclusive)
 * @param {Number} max - maximum value (exclusive)
 * @return {Number} - random integer
 */
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};

module.exports = generateOtp;
