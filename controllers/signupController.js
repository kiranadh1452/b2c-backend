const Seller = require("../models/sellerModel");
const Customer = require("../models/customerModel");
const generateOtp = require("../utils/otpGenerator");
const { setCacheOTP } = require("../cache/otp");
/**
 * Controller function to handle signup process
 * @returns {object} - response object
 */
const signupController = async (req, res, next) => {
    try {
        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            dob: req.body.dob,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            userType: req.body.userType,
            password: req.body.password,
            shippingAddress: req.body.shippingAddress,
        };

        /**
         * Scenarios where the user is not allowed to signup
         * The email or phone number are critical while signing up
         * So, check for these fields in both Seller and Customer models
         */
        const possibleCombinationOfUserExistence = [
            ["email", userData.email, Seller],
            ["phone", userData.phone, Seller],
            ["email", userData.email, Customer],
            ["phone", userData.phone, Customer],
        ];
        possibleCombinationOfUserExistence.forEach(async (combination) => {
            const [fieldName, fieldValue, modelName] = combination;
            const userExists = await checkIfUserExists(
                fieldName,
                fieldValue,
                modelName
            );
            if (userExists) {
                return res.status(409).json({
                    success: false,
                    message: "User already exists",
                });
            }
        });

        // generate OTP and check it exists
        const otp = generateOtp();
        if (!otp) {
            return res.status(500).json({
                success: false,
                message: "OTP generation failed",
            });
        }
        userData.otp = otp;

        // some code here to send otp to user via sms or email

        // cache the user info including OTP
        const cacheData = setCacheOTP("new", userData.email, userData);
        if (!cacheData) {
            return res.status(500).json({
                success: false,
                message: "Some issue with the server, please try again later",
            });
        }

        // currently, the email sender has not been set up, so I am sending the OTP as a response itself
        // when email sender will be setup, we should not set up the OTP as a response
        return res.status(200).json({
            success: true,
            message: "OTP sent to your registered email/phone",
            otp: otp,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Function to check if user exists
 */
const checkIfUserExists = async (fieldName, fieldValue, modelName) => {
    const user = await modelName.findOne({ fieldName: fieldValue });
    if (user) {
        return true;
    }
    return false;
};
module.exports = signupController;
