const express = require('express');
const morgan = require('morgan');
const app = express();

const aliensRoutes = require('./api/routes/aliens');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Cors
app.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Origin',
        '*'  // or add your url to which you want to limit the api usage to
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).json({});
    }
});

app.use('/aliens', aliensRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;