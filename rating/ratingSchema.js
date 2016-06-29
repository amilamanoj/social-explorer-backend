// Load required packages
var mongoose = require('mongoose');

// Define our rating schema
var Rating   = new mongoose.Schema({
    rate: Number,
    description: String,
    createdUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ratedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    createdDate: Date
});

// Export the Mongoose model
module.exports = mongoose.model('Rating', Rating);