// package dependencies
const mongoose = require("mongoose");

// shop schema
const shopSchema = new mongoose.Schema(
    {
        seller: {
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
            required: false,
        },
        shopDescription: {
            type: String,
            required: true,
        },
        shopLogo: {
            type: String,
            required: false,
        },
        shopBanner: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Shop = mongoose.model("Shop", shopSchema);
module.exports = Shop;
