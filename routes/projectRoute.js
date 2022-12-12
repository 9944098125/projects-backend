const express = require("express");
const {
  createProject,
  getProjects,
  updateProjects,
  deleteProject,
  deleteAllProjects,
} = require("../controllers/projectsController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/createProject").post(createProject);
router.route("/getProjects/:userId").get(protect, getProjects);
router.route("/update/:id").put(protect, updateProjects);
router.route("/delete/:id").delete(protect, deleteProject);
router.route("/deleteAll").delete(protect, deleteAllProjects);

module.exports = router;
