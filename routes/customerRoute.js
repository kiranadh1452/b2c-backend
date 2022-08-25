const express = require("express");
// dependencies from other files

// constants
const {
    REQUIRED_FIELDS_SIGNUP,
    REQUIRED_FIELDS_LOGIN,
} = require("../constants");
// middlewares
const { isCustomer } = require("../middlewares/userTypeValidation");
const checkForTokenValidation = require("../middlewares/tokenValidation");
const {
    dataFormatValidation,
    nonEmptyDataValidation,
    validationResultHandler,
    nonEmptyPlusDataFormatValidation,
} = require("../middlewares/dataFormatValidation");

// controllers
const loginController = require("../controllers/loginController");
const {
    signupController,
    postSignupVerificationController,
} = require("../controllers/signupController");
const {
    changePasswordController,
    forgotPasswordController,
    verifyPasswordChangeController,
} = require("../controllers/passwordChangeController");

const router = express.Router();

// these end points require no headers
router.post(
    "/login",
    nonEmptyPlusDataFormatValidation(REQUIRED_FIELDS_LOGIN),
    validationResultHandler,
    loginController
);
router.post(
    "/signup",
    nonEmptyDataValidation(REQUIRED_FIELDS_SIGNUP),
    dataFormatValidation([...REQUIRED_FIELDS_SIGNUP, "middleName"]),
    validationResultHandler,
    signupController
);
router.post(
    "/signup/verify",
    nonEmptyPlusDataFormatValidation(["otp", "email"]),
    validationResultHandler,
    postSignupVerificationController
);
router.post("/forgot-password", forgotPasswordController);
router.post("/forgot-password/verify", verifyPasswordChangeController);

// the end points below require a valid token, hence router would use middleware
// to ensure valid token in passed in the request header
router.use(checkForTokenValidation);
router.use(isCustomer);
router.post("/change-password", changePasswordController);

module.exports = router;
