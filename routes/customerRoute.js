const express = require("express");
// dependencies from other files
const loginController = require("../controllers/loginController");
const signupController = require("../controllers/signupController");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Customer Route");
});
router.post("/login", loginController);
router.post("/signup", signupController);

module.exports = router;
