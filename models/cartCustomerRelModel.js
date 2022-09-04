const mongoose = require("mongoose");

/**
 * Schema for the Cart-Customer Relational Model.
 */
const cartCustomerRelSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart",
            required: true,
        },
    ],
});

const Cart_Customer_Rel = mongoose.model(
    "Cart_Customer_Rel",
    cartCustomerRelSchema
);
module.exports = Cart_Customer_Rel;
