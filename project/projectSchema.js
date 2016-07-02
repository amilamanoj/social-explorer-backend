// Load required packages
var mongoose = require('mongoose');

// Define our project schema
var Project   = new mongoose.Schema({
    title: String,
    description: String,
    objective: String,
    fromDate: Date,
    toDate: Date,
    country: String,
    city: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    img: String,
    createdDate: Date
});

// Export the Mongoose model
module.exports = mongoose.model('Project', Project);