/**
 * Description: Validates the user types for the seller and customer
 * Pre-requirement: Use middleware from file `tokenValidation.js` before using any of these middlewares
 *
 * The following middlewares work assuming that there is some data in the `res.locals.authData` object.
 * So, using the middleware in `tokenValidation.js` the `res` object is modified and the `res.locals.authData` object is populated with the user data.
 */

const Kyc = require("../models/kycModel");

const isSeller = async (req, res, next) => {
    try {
        if (res.locals.authData.userType === "seller") {
            next();
        } else {
            return res.status(401).json({
                message: "You are not authorized to access this resource",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: `Something went wrong: ${error}`,
        });
    }
};

const isCustomer = async (req, res, next) => {
    try {
        if (res.locals.authData.userType === "customer") {
            next();
        } else {
            return res.status(401).json({
                message: "You are not authorized to access this resource",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: `Something went wrong: ${error}`,
        });
    }
};

const isUser = async (req, res, next) => {
    try {
        if (
            res.locals.authData.userType === "customer" ||
            res.locals.authData.userType === "seller"
        ) {
            next();
        } else {
            return res.status(401).json({
                message: "You are not authorized to access this resource",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: `Something went wrong: ${error}`,
        });
    }
};

/**
 * To be a verified seller, the seller must have a verified KYC document.
 * Using the seller id, find the seller's KYC document and check if it is verified.
 */
const isVerifiedSeller = async (req, res, next) => {
    try {
        const sellerId = res.locals.authData._id;
        const kycData = await Kyc.findOne({ sellerId });

        if (!kycData || !kycData.verified) {
            return res.status(401).json({
                message: "You are not authorized to access this resource",
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            message: `Something went wrong: ${error}`,
        });
    }
};

module.exports = {
    isUser,
    isSeller,
    isCustomer,
    isVerifiedSeller,
};
