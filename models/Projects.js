const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const projectsSchema = new mongoose.Schema(
  {
    projectTitle: {
      type: String,
      required: true,
      unique: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
    projectLink: {
      type: String,
    },
    userId: {
      type: ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const Projects = mongoose.model("Projects", projectsSchema);

module.exports = Projects;
