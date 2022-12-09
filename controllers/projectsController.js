const Projects = require("../models/Projects");

const createProject = async (req, res, next) => {
  try {
    const { projectTitle, projectDescription, projectLink } = req.body;
    if (!(projectTitle || projectDescription)) {
      return res.status(404).json({ error: "All fields are required !" });
    }
    const oldProject = await Projects.findOne({ projectTitle });
    if (oldProject) {
      return res.status(400).json({
        error: "That Name is already taken ! Please select some other Name...",
      });
    } else {
      const newProject = new Projects({
        projectTitle,
        projectDescription,
        projectLink,
      });
      const savedProject = await newProject.save();
      res.status(201).json({
        message: "Created Project Successfully",
        project: savedProject,
      });
    }
  } catch (err) {
    next(err);
    console.log("create project error in backend: ", err);
  }
};

module.exports = { createProject };
