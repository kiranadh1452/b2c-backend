const mongoose = require("mongoose");

/**
 * Schema for the KYC (Know Your Customer) model.
 */
const kycSchema = new mongoose.Schema(
    {
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        kycDate: {
            type: Date,
            required: true,
        },
        kycDocumentType: {
            type: String,
            required: true,
        },
        kycDocumentImage: {
            type: [String],
            required: true,
        },
        kycDocumentNumber: {
            type: String,
            required: true,
        },
        kycDocumentExpiry: {
            type: String,
            required: true,
        },
        kycDocumentIssuedBy: {
            type: String,
            required: true,
        },
        kyDocumentIssuedDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Kyc = mongoose.model("Kyc", kycSchema);
module.exports = Kyc;
