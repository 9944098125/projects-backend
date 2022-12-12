const express = require("express");
const { signup, sign_in } = require("../controllers/authController");

const router = express.Router();

router.route("/sign_up").post(signup);
router.route("/sign_in").post(sign_in);

module.exports = router;
