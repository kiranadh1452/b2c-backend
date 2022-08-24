const Seller = require("../models/sellerModel");
const Customer = require("../models/customerModel");
const generateOtp = require("../utils/otpGenerator");
const { setCache, getCache } = require("../cache/cacheHandler");
const { encryptPasswordFunc, makeSalt } = require("./authHelper");

const forgotPasswordController = async (req, res, next) => {
    try {
        const { email, userType, newPassword } = req.body;

        if (!email || !userType || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please provide email, user type and new password",
            });
        }

        // is userType customer or seller ?
        let User = undefined;
        if (userType === "seller") {
            User = Seller;
        } else if (userType === "customer") {
            User = Customer;
        } else {
            return res.status(400).json({
                success: false,
                message: "Please provide valid user type",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        // generate OTP and check it exists
        const otp = generateOtp();
        if (!otp) {
            return res.status(500).json({
                success: false,
                message: "OTP generation failed",
            });
        }
        user.otp = otp;

        user.salt = makeSalt();
        user.hashedPassword = encryptPasswordFunc(newPassword, user.salt);

        const cacheData = setCache("forgot-password", email, user);
        if (!cacheData) {
            return res.status(500).json({
                success: false,
                message: "Some issue with the server, please try again later",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Password reset link sent to your email",
            otp: user.otp,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

const verifyPasswordChangeController = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        // check if some data is cached for the requested email
        const cachedData = getCache("forgot-password", email);
        if (!cachedData) {
            return res.status(404).json({
                success: false,
                message: "OTP not found",
            });
        }

        const User = cachedData.userType === "seller" ? Seller : Customer;
        const userExists = await User.countDocuments({ email });
        if (!userExists) {
            return res.status(409).json({
                success: false,
                message: "This account has been deleted",
            });
        }

        // verify the otp
        if (cachedData.otp !== otp) {
            return res.status(409).json({
                success: false,
                message: "OTP does not match",
            });
        }

        // otp is not stored in database, that's why delete it
        delete cachedData.otp;


        const user = await User.findOneAndUpdate(
            { email },
            { $set: cachedData }
        );

        if (!user) {
            return res.status(500).json({
                success: false,
                message: "Could not reset password right now",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user: user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { forgotPasswordController, verifyPasswordChangeController };
