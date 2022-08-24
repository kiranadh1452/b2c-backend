// package-based dependencies
const crypto = require("crypto");
const mongoose = require("mongoose");

// file based dependencies
const userSchema = require("./baseUserModel");

// add shipping address to userSchema to form a customer schema
const customerSchema = new mongoose.Schema({
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
        enum: ["customer", "seller"],
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    shippingAddress: {
        type: String,
        required: true,
    },
});

// methods inside user schema
customerSchema.methods = {
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

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
