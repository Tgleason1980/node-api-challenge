const express = require('express');
const server = express();

/* ROUTER */
const projectRouter = require('./router/projectRouter.js');
const actionsRouter = require('./router/actionsRouter.js');

/* MIDDLEWARE */
server.use(express.json());
server.use('/projects', projectRouter);
server.use('/actions', actionsRouter);

/* SANITY CHECK */
server.get('/', (req, res) => {
  res.send(`You are sane`);
});

module.exports = server;