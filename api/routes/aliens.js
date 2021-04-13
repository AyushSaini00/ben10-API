const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /aliens'
    });
});

router.post('/', (req, res, next) => {
    const alien = {
        name: req.body.name,
        power: req.body.power
    };
    res.status(200).json({
        message: 'Handling POST requests to /aliens',
        createdAlien: alien
    });
});

router.patch('/:alienId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated Alien'
    });
});

router.delete('/:alienId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted Alien'
    });
});

module.exports = router;