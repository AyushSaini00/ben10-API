const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Alien = require('../models/alien');

router.get('/', (req, res, next) => {
    Alien.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const alien = new Alien({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        power: req.body.power
    });
    alien.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Handling POST requests to /aliens',
            createdAlien: alien
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get("/:alienId", (req, res, next) => {
    const id = req.params.alienId;
    Alien.findById(id)
        .exec()
        .then(doc => {
            console.log("from database",doc);
            if(doc){
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.patch('/:alienId', (req, res, next) => {
    const id = req.params.alienId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Alien.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:alienId', (req, res, next) => {
    const id = req.params.alienId;
    Alien.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

module.exports = router;