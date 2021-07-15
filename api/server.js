const express = require('express');

const server = express();

const db = require('../data/db-config');


server.use(express.json());

server.get('/api/recipes', async (req, res, next) => {
  await db('recipes');
  res.json({
    message: "it's working"
  });
});

server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
});

module.exports = server;
