const express = require('express');
const app = express();

const aliensRoutes = require('./api/routes/aliens');

app.use('/aliens', aliensRoutes);

module.exports = app;