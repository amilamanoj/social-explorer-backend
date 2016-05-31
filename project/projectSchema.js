// Load required packages
var mongoose = require('mongoose');

// Define our project schema
var Project   = new mongoose.Schema({
    title: String,
    description: String,
    fromDate: Date,
    toDate: Date,
    country: String,
    city: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    img: String
});

// Export the Mongoose model
module.exports = mongoose.model('Project', Project);