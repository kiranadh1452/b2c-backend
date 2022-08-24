const jwt = require("jsonwebtoken");
const Seller = require("../models/sellerModel");
const Customer = require("../models/customerModel");

// external dependencies
const {
    authenticate,
    encryptPasswordFunc,
    makeSalt,
} = require("./authHelper.js");

/**
 * Controller function to handle admin login
 * @returns {object} - response object
 */
const loginController = async (req, res, next) => {
    try {
        const { email, password, rememberMe, userType } = req.body;

        // is email and password present ?
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password",
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
                message: "Please provide user type",
            });
        }

        const user = await User.findOne({ email }, "+salt +hashedPassword");

        // user exists ?
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        if (!user.hashedPassword) {
            return res.status(400).json({
                success: false,
                message: "No password found",
            });
        }

        // user type stored vs user type provided
        if (user.userType !== userType) {
            return res.status(400).json({
                success: false,
                message: "User type does not match",
            });
        }

        if (!authenticate(password, user.salt, user.hashedPassword)) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
            });
        }

        const expiryTime = rememberMe ? "7d" : "1d";

        // this salt token is also returned to the user
        const saltToken = jwt.sign(user.salt, process.env.SECRET_SALT);

        /**
         * json.sign(payload, secret, options)
         * Here, if payload is not a object literal, then the expiry time won't be set.
         */
        const token = jwt.sign(
            user.toJSON(),
            process.env.SECRET_SALT + user.salt,
            {
                expiresIn: expiryTime,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token: token + " " + saltToken,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err,
        });
    }
};

module.exports = loginController;
