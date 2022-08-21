const mongoose = require("mongoose");

/**
 * Schema for a cart
 */
const cartSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateUpdated: {
        type: Date,
        default: Date.now,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
