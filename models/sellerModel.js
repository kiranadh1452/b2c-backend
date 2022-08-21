const extend = require("mongoose-schema-extend");
const userSchema = require("./baseUserModel");

// extend the userSchema to form a seller schema
const sellerSchema = userSchema.extend({
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

const seller = mongoose.model("seller", sellerSchema);
module.exports = seller;
