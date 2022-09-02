const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

/**
 * Function to validate the auth token
 * Verify salt token first, then use thus obtained salt + global salt to verify the token
 * @returns {object} - response object
 */
const checkForTokenValidation = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "You are not authorized to access this resource",
            });
        }

        const authToken = authHeader.split(" ");
        const [bearer, accessToken, saltToken] = authToken;
        let salt = undefined;

        // first, verify saltToken and get the user specific salt
        if (saltToken) {
            salt = jwt.verify(saltToken, process.env.SECRET_SALT);
        }

        // use the obtained salt and global secret salt to verify the token
        if (bearer === "Bearer" && accessToken) {
            try {
                const verifiedData = jwt.verify(
                    accessToken,
                    process.env.SECRET_SALT + salt
                );
                const user = await User.findOne(
                    { email: verifiedData.email },
                    "+salt"
                );
                if (user.salt !== verifiedData.salt) {
                    return res.status(401).json({
                        message:
                            "You are not authorized to access this resource",
                    });
                }
                if (verifiedData) {
                    res.locals.authData = verifiedData;
                    next();
                }
            } catch (err) {
                return res.status(401).json({
                    message: `Access Denied: ${err}`,
                });
            }
        }
    } catch (err) {
        return res.status(500).json({
            message: `Something went wrong: ${err}`,
        });
    }
};

module.exports = checkForTokenValidation;
