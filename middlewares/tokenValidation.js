const jwt = require("jsonwebtoken");

/**
 * Function to validate the auth token
 * @returns {object} - response object
 */
const checkForTokenValidation = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "You are not authorized to access this resource",
            });
        }

        const authToken = authHeader.split(" ");
        const [bearer, token] = authToken;

        if (bearer === "Bearer" && token) {
            try {
                const verifiedData = jwt.verify(token, process.env.SECRET_SALT);
                if (verifiedData) {
                    res.data = verifiedData;
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
