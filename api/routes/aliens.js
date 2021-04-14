const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Alien = require('../models/alien');

router.get('/', (req, res, next) => {
    Alien.find()
        .select('-__v') // fetch everything except __v
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                aliens: docs.map(doc => {
                    return {
                        _id: doc._id,
                        general: {
                            name: doc.general.name,
                            species: doc.general.species,
                            homeWorld: doc.general.homeWorld,
                            body: doc.general.body
                        },
                        series: doc.series,
                        abilities: doc.abilities,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/aliens/' + doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);
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
        general: {
            name: req.body.general.name,
            species: req.body.general.species,
            homeWorld: req.body.general.homeWorld,
            body: req.body.general.body
        },
        series: req.body.series,
        abilities: req.body.abilities
    });
    alien.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Alien Created Successfully',
            createdAlien: {
                _id: result._id,
                general: {
                    name: result.general.name,
                    species: result.general.species,
                    homeWorld: result.general.homeWorld,
                    body: result.general.body
                },
                series: result.series,
                abilities: result.abilities,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/aliens/' + result._id
                }
            }
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
        .select('-__v')
        .exec()
        .then(doc => {
            console.log("from database",doc);
            if(doc){
                res.status(200).json({
                    alien: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/aliens'
                    }
                });
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
            res.status(200).json({
                message: 'Alien Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/aliens/' + id
                }
            });
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
            res.status(200).json({
                message: 'Alien Deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/aliens',
                    body: { name: 'String'}
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

module.exports = router;