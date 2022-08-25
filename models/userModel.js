const mongoose = require("mongoose");
const { USER_TYPES } = require("../constants.js");

/**
 * Create a schema for the user model
 * This is an abstract model that will be extended by the other models.
 * These other models would be the customer and seller models.
 */
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: false,
    },
    dob: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: USER_TYPES,
        required: true,
    },
    hashedPassword: {
        type: String,
        select: false,
        required: true,
    },
    salt: {
        type: String,
        required: true,
        select: false,
    },
});

// methods inside user schema
userSchema.methods = {
    /**
     * Method to authenticate the user
     * @param {String} password - password to authenticate
     * @return {Boolean} - true if password is correct, false otherwise
     */
    authentication(password) {
        // use a global secret salt and a user specific random salt to hash the password
        const encryptWith = process.env.SECRET_SALT + this.salt;
        const newEncrypt = this.encryptPasswordFunc(password, encryptWith);
        if (!newEncrypt || !this.hashedPassword) return false;
        return newEncrypt === this.hashedPassword;
    },

    /**
     * Method to encrypt the password
     * @param {String} password - password to encrypt
     * @return {String} - encrypted password
     */
    encryptPasswordFunc(password) {
        if (!password) return "";
        try {
            const encryptWith = process.env.SECRET_SALT + this.salt;
            return crypto
                .createHmac("sha256", encryptWith)
                .update(password)
                .digest("hex");
        } catch (err) {
            console.log(err);
        }
    },

    /**
     * Function to create a salt using current date and random number
     * @return {String} - salt
     */
    makeSalt() {
        const salt = Math.round(new Date().valueOf() * Math.random()) + "";
        return salt;
    },
};

const User = mongoose.model("User", userSchema);
module.exports = User;
