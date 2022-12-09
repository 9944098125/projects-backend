const express = require("express");
const { createProject } = require("../controllers/projectsController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/createProject").post(protect, createProject);

module.exports = router;
