const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world!',
  });
});

module.exports = app;
