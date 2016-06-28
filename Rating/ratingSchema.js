// Load required packages
var mongoose = require('mongoose');

// Define our rating schema
var Rating   = new mongoose.Schema({
    rate: Number,
    description: String,
    createUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ratedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdDate: Date
});

// Export the Mongoose model
module.exports = mongoose.model('Rating', Rating);