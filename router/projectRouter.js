const express = require('express');
const Project = require('../data/helpers/projectModel.js');

const projectRouter = express.Router();

/* MIDDLEWARE */
projectRouter.use(express.json());

/* ROUTES */
projectRouter.post('/', async (req, res) => {
  const { name, description } = req.body
  try {
    const newProject = await Project.insert(req.body);
    if (!name || !description) {
      res.status(400).json({ message: `Please provide a project name and description.` });
    } else {
      res.status(200).json(newProject);
    };
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `An error occurred: ${err}` });
  };
});

projectRouter.get('/', async (req, res) => {
  try {
    const allProjects = await Project.get();
    res.status(200).json(allProjects);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `An error occurred: ${err}` });
  };
});

projectRouter.get('/:id', async (req, res) => {
  try {
    const project = await Project.get(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(400).json({ message: `Invalid project ID. Please provide a valid project ID.` });
    };
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `An error occurred: ${err}` });
  };
});

projectRouter.delete('/:id', async (req, res) => {
  try {
    const project = await Project.remove(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(400).json({ message: `Invalid project ID. Please provide a valid project ID.` });
    };
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `An error occurred: ${err}` });
  };
});

projectRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;
  try {
    const project = await Project.get(id);
    if (project) {
      await Project.update(id, { name, description, completed });
      res.status(200).json(project);
    } else {
      res.status(400).json({ message: `Invalid project ID. Please provide a valid project ID.` });
    };
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `An error occurred: ${err}` });
  };
});

module.exports = projectRouter;