const Seller = require("../models/sellerModel");
const Customer = require("../models/customerModel");
const generateOtp = require("../utils/otpGenerator");
const { setCache, getCache } = require("../cache/cacheHandler");
const { encryptPasswordFunc, makeSalt } = require("./authHelper");

const forgotPasswordController = async (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: "Password reset link sent to your email",
    });
};

module.exports = forgotPasswordController;
