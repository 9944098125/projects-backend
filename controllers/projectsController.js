const Projects = require("../models/Projects");

const createProject = async (req, res, next) => {
  try {
    const { projectTitle, projectDescription, projectLink, userId } = req.body;
    if (!(projectTitle || projectDescription || userId)) {
      return res.status(404).json({ error: "All fields are required !" });
    }
    const oldProject = await Projects.findOne({ projectTitle });
    if (oldProject) {
      return res.status(400).json({
        error: "That Name is already taken ! Please go with some other Name...",
      });
    } else {
      const newProject = new Projects({
        projectTitle,
        projectDescription,
        projectLink,
        userId,
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

const getProjects = async (req, res, next) => {
  try {
    const projects = await Projects.find({ userId: req.params.userId });
    res.status(201).json({ projects });
  } catch (err) {
    next(err);
    console.log("error in get projects backend", err);
  }
};

const updateProjects = async (req, res, next) => {
  try {
    const updatedProject = await Projects.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    const savedProject = await updatedProject.save();
    res.status(200).json(savedProject);
  } catch (err) {
    console.log("update project error: ", err);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    await Projects.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Project deleted successfully" });
  } catch (err) {
    next(err);
    console.log("error in delete project backend: ", err);
  }
};

const deleteAllProjects = async (req, res, next) => {
  try {
    await Projects.deleteMany();
    res.status(201).json({ message: "All the Projects deleted successfully" });
  } catch (err) {
    next(err);
    console.log("error in delete all projects: ", err);
  }
};

module.exports = {
  createProject,
  getProjects,
  updateProjects,
  deleteProject,
  deleteAllProjects,
};
