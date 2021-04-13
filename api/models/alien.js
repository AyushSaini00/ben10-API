const mongoose = require("mongoose");

const alienSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    power: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Alien', alienSchema);