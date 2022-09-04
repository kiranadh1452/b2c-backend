const mongoose = require("mongoose");

/**
 * Schema for the Category model.
 */
const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        desc: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
