const mongoose = require("mongoose");

/**
 * Schema for the KYC (Know Your Customer) model.
 */
const kycSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
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
});

const Kyc = mongoose.model("Kyc", kycSchema);
module.exports = Kyc;
