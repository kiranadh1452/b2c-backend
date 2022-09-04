const express = require("express");

// dependencies from other files
const { REQUIRED_FIELDS_ADD_SHOP } = require("../constants");

// middlewares
const { isSeller } = require("../middlewares/userTypeValidation");
const checkForTokenValidation = require("../middlewares/tokenValidation");
const {
    dataFormatValidation,
    validationResultHandler,
    nonEmptyPlusDataFormatValidation,
} = require("../middlewares/dataFormatValidation");

// controllers
const {
    addShopController,
    editShopController,
    deleteShopController,
} = require("../controllers/seller/shopController");

const router = express.Router();

// use token validation first, then check for user type (do not reverse this order)
router.use(checkForTokenValidation, isSeller);
router.post(
    "/add-shop",
    nonEmptyPlusDataFormatValidation(REQUIRED_FIELDS_ADD_SHOP),
    validationResultHandler,
    addShopController
);
router.patch(
    "/edit-shop",
    dataFormatValidation(REQUIRED_FIELDS_ADD_SHOP),
    validationResultHandler,
    editShopController
);
router.patch(
    "/delete-shop/:shopId",
    nonEmptyPlusDataFormatValidation(["shopId"]),
    deleteShopController
);

module.exports = router;
