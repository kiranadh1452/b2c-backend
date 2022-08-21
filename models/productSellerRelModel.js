const mongoose = require("mongoose");

/**
 * Schema for a product seller relationship
 */
const ProductSellerRelSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        index: true,
    },
    productId: {
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
