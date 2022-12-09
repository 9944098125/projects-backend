const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const projectsSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "Users",
    },
    projectTitle: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
    projectLink: {
      type: String,
    },
  },
  { timestamps: true }
);

const Projects = mongoose.model("Project", projectsSchema);

module.exports = Projects;
