// package-based dependencies
const mongoose = require("mongoose");
const extend = require("mongoose-schema-extend");

// file based dependencies
const userSchema = require("./baseUserModel");

// add shipping address to userSchema to form a customer schema
const customerSchema = userSchema.extend({
    shippingAddress: {
        type: String,
        required: true,
    },
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
