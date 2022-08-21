const mongoose = require("mongoose");

/**
 * Schema for a product
 */
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    desc: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    productImage: String,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
