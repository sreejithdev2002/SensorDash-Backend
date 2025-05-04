const mongoose = require('mongoose');

const dataPointSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    value: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('DataPoint', dataPointSchema);