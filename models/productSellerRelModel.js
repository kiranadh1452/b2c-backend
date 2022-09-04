const mongoose = require("mongoose");

/**
 * Schema for a product seller relationship
 */
const ProductSellerRelSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        index: true,
    },
});

const Product_Seller_Rel = mongoose.model(
    "Product_Seller_Rel",
    ProductSellerRelSchema
);
module.exports = Product_Seller_Rel;
