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
        select: false,
    },
    salt: {
        type: String,
        required: true,
        select: false,
    },
    companyName: {
        type: String,
        required: false,
    },
    companyAddress: {
        type: String,
        required: false,
    },
    companyPhone: {
        type: String,
        required: false,
    },
    companyEmail: {
        type: String,
        required: false,
    },
    companyWebsite: {
        type: String,
        required: false,
    },
    companyDescription: {
        type: String,
        required: false,
    },
    companyLogo: {
        type: String,
        required: false,
    },
    companyBanner: {
        type: String,
        required: false,
    },
});

const Seller = mongoose.model("Seller", sellerSchema);
module.exports = Seller;
