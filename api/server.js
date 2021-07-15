const express = require('express');

const server = express();

const db = require('../data/db-config');


server.use(express.json());

server.use('/api/recipe', (req, res, next) => {
  // 
});

server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
});

module.exports = server;
