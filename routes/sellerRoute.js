const express = require("express");

// dependencies from other files

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
const {
    addShopController,
    editShopController,
} = require("../controllers/seller/shopController");

const router = express.Router();
router.use(checkForTokenValidation, isSeller);
router.post("/add-shop", addShopController);
router.patch("/edit-shop", editShopController);

module.exports = router;
