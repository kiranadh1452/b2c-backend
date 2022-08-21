const mongoose = require("mongoose");

/**
 * Schema for the kycSellerRelModel.
 */
const kycSellerRelSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        required: true,
    },
    kycId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Kyc",
        required: true,
    },
});

const KycSellerRel = mongoose.model("KycSellerRel", kycSellerRelSchema);
module.exports = KycSellerRel;
