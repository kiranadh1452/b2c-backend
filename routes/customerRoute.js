const express = require("express");
// dependencies from other files
const loginController = require("../controllers/loginController");
const checkForTokenValidation = require("../middlewares/tokenValidation");
const {
    signupController,
    postSignupVerificationController,
} = require("../controllers/signupController");
const {
    forgotPasswordController,
    verifyPasswordChangeController,
} = require("../controllers/passwordChangeController");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Customer Route");
});

// these end points require no headers
router.post("/login", loginController);
router.post("/signup", signupController);
router.post("/forgot-password", forgotPasswordController);
router.post("/signup/verify", postSignupVerificationController);
router.post("/forgot-password/verify", verifyPasswordChangeController);

// the end points below require a valid token, hence router would use middleware
// to ensure valid token in passed in the request header
router.use(checkForTokenValidation);

module.exports = router;
