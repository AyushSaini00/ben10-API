const express = require('express');
const morgan = require('morgan');
const app = express();

const aliensRoutes = require('./api/routes/aliens');

app.use(morgan('dev'));

app.use('/aliens', aliensRoutes);

module.exports = app;