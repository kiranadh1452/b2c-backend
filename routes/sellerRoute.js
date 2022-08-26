const express = require("express");

// dependencies from other files

// constants
const {
    REQUIRED_FIELDS_SIGNUP,
    REQUIRED_FIELDS_LOGIN,
} = require("../constants");

// middlewares
const { isSeller } = require("../middlewares/userTypeValidation");
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

module.exports = router;
