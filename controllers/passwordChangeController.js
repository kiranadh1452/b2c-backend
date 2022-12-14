const User = require("../models/userModel");
const generateOtp = require("../utils/otpGenerator");
const { setCache, getCache } = require("../cache/cacheHandler");
const { authenticate, encryptPasswordFunc, makeSalt } = require("./authHelper");

const forgotPasswordController = async (req, res, next) => {
    try {
        const { email, userType, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please provide email, user type and new password",
            });
        }

        // check for user and if the user type provided in request is same as stored in database
        const user = await User.findOne({ email });
        if (!user || user.userType !== userType) {
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

const changePasswordController = async (req, res, next) => {
    try {
        const { password, newPassword } = req.body;
        const { email, userType } = res.locals.authData;
        // this controller requires user authentication, hence it is reached only after the middleware
        // since the middleware sets the authenticated user data in `res.locals.authData`, we can look into this value

        const user = await User.findOne({ email }, "+salt +hashedPassword");
        if (!user || !user.hashedPassword) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
        if (!authenticate(password, user.salt, user.hashedPassword)) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
            });
        }

        // generate new salt and get new password hash
        user.salt = makeSalt();
        user.hashedPassword = encryptPasswordFunc(newPassword, user.salt);
        await user.updateOne({
            salt: user.salt,
            hashedPassword: user.hashedPassword,
        });

        res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
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
            message: "Password reset successfully",
            user: user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    forgotPasswordController,
    changePasswordController,
    verifyPasswordChangeController,
};
