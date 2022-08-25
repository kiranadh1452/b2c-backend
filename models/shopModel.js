// package dependencies
const mongoose = require("mongoose");

// shop schema
const shopSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    shopName: {
        type: String,
        required: true,
    },
    shopAddress: {
        type: String,
        required: true,
    },
    shopPhone: {
        type: String,
        required: true,
    },
    shopEmail: {
        type: String,
        required: true,
    },
    shopWebsite: {
        type: String,
        required: true,
    },
    shopDescription: {
        type: String,
        required: true,
    },
    shopLogo: {
        type: String,
        required: true,
    },
    shopBanner: {
        type: String,
        required: true,
    },
});

const Shop = mongoose.model("Shop", shopSchema);
module.exports = Shop;
