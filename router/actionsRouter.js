const express = require('express');
const Action = require('../data/helpers/actionModel.js');

const actionsRouter = express.Router();

/* MIDDLEWARE */
actionsRouter.use(express.json());

/* ROUTES */
actionsRouter.post('/', async (req, res) => {
  const { project_id, notes, description } = req.body
  try {
    const newAction = await Action.insert(req.body);
    if (project_id && notes && description) {
      res.status(200).json(newAction);
    } else {
      res.status(400).json({ message: `Could not add the action.` });
    };
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `An error occurred: ${err}` });
  };
});

actionsRouter.get('/', async (req, res) => {
  try {
    const allActions = await Action.get();
    res.status(200).json(allActions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `An error occurred: ${err}` });
  };
});

actionsRouter.get('/:id', async (req, res) => {
  try {
    const action = await Action.get(req.params.id);
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(400).json({ message: `Invalid action ID. Please provide a valid action ID.` });
    };
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `An error occurred: ${err}` });
  };
});

actionsRouter.delete('/:id', async (req, res) => {
  try {
    const action = await Action.remove(req.params.id);
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(400).json({ message: `Invalid action ID. Please provide a valid action ID.` });
    };
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `An error occurred: ${err}` });
  };
});

actionsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { project_id, notes, description, completed } = req.body;
  try {
    const action = await Action.get(id);
    if (action) {
      await Action.update(id, { project_id, notes, description, completed });
      res.status(200).json(action);
    } else {
      res.status(400).json({ message: `Invalid action ID. Please provide a valid action ID.` });
    };
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `An error occurred: ${err}` });
  };
});

module.exports = actionsRouter;