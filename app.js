const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'node_modules', 'wayt-frontend', 'build', 'index.html'));
});

app.use('/static', express.static(path.resolve(__dirname, 'node_modules', 'wayt-frontend', 'build')));

module.exports = app;
