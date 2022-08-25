const User = require("../models/userModel");
const generateOtp = require("../utils/otpGenerator");
const { setCache, getCache } = require("../cache/cacheHandler");
const { encryptPasswordFunc, makeSalt } = require("./authHelper");
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
        };

        const userExists = await ensureNoUserExist(userData);
        if (userExists) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
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
        userData.otp = otp;

        // create a salt, generate hashedValue of password, then delete password
        userData.salt = makeSalt();
        userData.hashedPassword = encryptPasswordFunc(userData.password, userData.salt)
        delete userData.password;

        // some code here to send otp to user via sms or email

        // cache the user info including OTP
        const cacheData = setCache("new", userData.email, userData);
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
 * Controller to handle post signup otp verification
 */
const postSignupVerificationController = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        // check if some data is cached for the requested email
        const cachedData = getCache("new", email);
        if (!cachedData) {
            return res.status(404).json({
                success: false,
                message: "OTP not found",
            });
        }

        const userExists = await ensureNoUserExist(cachedData);
        if (userExists) {
            return res.status(409).json({
                success: false,
                message: "Your account has already been created",
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

        const newUser = await new User({
            ...cachedData,
        }).save();

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user: newUser,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Function to ensure that no other user exist for the same email or phone
 * @param {Object} userData - user data to be checked
 * @returns
 */
const ensureNoUserExist = async (userData) => {
    /**
     * Scenarios where the user is not allowed to signup
     * The email or phone number are critical while signing up
     * So, check for these fields in both Seller and Customer models
     */
    const possibleCombinationOfUserExistence = [
        ["email", userData.email, User],
        ["phone", userData.phone, User],
    ];
    // possibleCombinationOfUserExistence.forEach(async (combination) => {
    for (let combination of possibleCombinationOfUserExistence) {
        const [fieldName, fieldValue, modelName] = combination;
        const userExists = await checkIfUserExists(
            fieldName,
            fieldValue,
            modelName
        );
        if (userExists) {
            return true;
        }
    }
    return false;
};

/**
 * Function to check if user exists
 * @param {String} fieldName - field name to be checked
 * @param {String} fieldValue - field value to be checked
 * @param {String} modelName - model name to be checked
 */
const checkIfUserExists = async (fieldName, fieldValue, modelName) => {
    let data = {};
    data[fieldName] = fieldValue;
    const user = await modelName.findOne({ ...data });
    if (user) {
        return true;
    }
    return false;
};
module.exports = { signupController, postSignupVerificationController };
