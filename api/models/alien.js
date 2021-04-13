const mongoose = require("mongoose");

const alienSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    power: Number
});

module.exports = mongoose.model('Alien', alienSchema);