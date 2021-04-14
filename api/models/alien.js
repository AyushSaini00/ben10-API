const mongoose = require("mongoose");

const alienSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    general: {
        name: {
            type: String,
            required: true
        },
        species: {
            type: String,
            required: true
        },
        homeWorld: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        }
    },
    series: {
        type: String
    },
    abilities: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('Alien', alienSchema);