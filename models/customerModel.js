// package-based dependencies
const mongoose = require("mongoose");
const extend = require("mongoose-schema-extend");

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

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
