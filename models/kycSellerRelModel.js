const mongoose = require("mongoose");

/**
 * Schema for the kycSellerRelModel.
 */
const kycSellerRelSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    kyc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Kyc",
        required: true,
    },
});

const KycSellerRel = mongoose.model("KycSellerRel", kycSellerRelSchema);
module.exports = KycSellerRel;
