// package dependencies
const mongoose = require("mongoose");
const extend = require("mongoose-schema-extend");

// import the base user schema
const userSchema = require("./baseUserModel");

// extend the userSchema to form a seller schema
const sellerSchema = new mongoose.Schema({
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
    companyName: {
        type: String,
        required: true,
    },
    companyAddress: {
        type: String,
        required: true,
    },
    companyPhone: {
        type: String,
        required: true,
    },
    companyEmail: {
        type: String,
        required: true,
    },
    companyWebsite: {
        type: String,
        required: true,
    },
    companyDescription: {
        type: String,
        required: true,
    },
    companyLogo: {
        type: String,
        required: true,
    },
    companyBanner: {
        type: String,
        required: true,
    },
});

const Seller = mongoose.model("Seller", sellerSchema);
module.exports = Seller;
