const express = require("express");
const {
  signup,
  sign_in,
  resetPassword,
  getUser,
  updateUser,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/sign_up").post(signup);
router.route("/sign_in").post(sign_in);
router.route("/reset_password").post(protect, resetPassword);
router.route("/getUser").get(getUser);
router.route("/updateUser/:userId").put(updateUser);

module.exports = router;
