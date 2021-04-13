const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Alien = require('../models/alien');

router.get('/', (req, res, next) => {
    Alien.find()
        .select('name power _id') // only fetch these
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                aliens: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/' + doc._id
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
        name: req.body.name,
        power: req.body.power
    });
    alien.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Alien Created Successfully',
            createdAlien: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/' + result._id
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
        .select('name power _id')
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
                    body: { name: 'String', power: 'Number' }
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