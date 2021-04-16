const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {

  // checking if the user already exits or not
   User.find({email: req.body.email})
      .exec()
      .then(user => {
        if(user.length >= 1){
          return res.status(409).json({
            message: "Mail already exists"
          });
        } else {
          bcrypt.hash(
            req.body.password,
            10,
            (err, hash) => {
              if(err){
                return res.status(500).json({
                  error: err
                });
              } else {
                const user = new User({
                  _id: new mongoose.Types.ObjectId(),
                  email: req.body.email,
                  password: hash
                });
                user.save() // to save the user in the db
                  .then(result => {
                    console.log(result);
                    res.status(201).json({
                      message: "User Created"
                    });
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).json({
                      error: err
                    });
                  });
              }
            }
          );
        }
      })
   
});

module.exports = router;