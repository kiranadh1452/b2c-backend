const express = require("express");
// dependencies from other files

// middlewares
const { isCustomer } = require("../middlewares/userTypeValidation");
const checkForTokenValidation = require("../middlewares/tokenValidation");

const router = express.Router();
router.use(checkForTokenValidation, isCustomer);

module.exports = router;
