const mongoose = require("mongoose");

/**
 * Schema for the Category-Product Relational model.
 */
const CategoryProductRelSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        index: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        index: true,
    },
});

const Category_Product_Rel = mongoose.model(
    "Category_Product_Rel",
    CategoryProductRelSchema
);
module.exports = Category_Product_Rel;
