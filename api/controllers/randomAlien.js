const Alien = require('../models/alien');

exports.random_alien = (req, res, next) => {
    Alien.find()
    .select('-__v')
    .exec()
    .then(docs => {
        const indexRandom = Math.floor(Math.random() * docs.length);
        const response = docs[indexRandom];
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });      
};