const mongoose = require("mongoose");

const cartCustomerRelSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    cartId: [
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
