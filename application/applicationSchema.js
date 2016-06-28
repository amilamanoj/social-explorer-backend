// Load required packages
var mongoose = require('mongoose');

// Define our application schema
var Application = new mongoose.Schema({
    createdDate: Date,
    status: {
        type: String,
        enum : ['PENDING','ACCEPTED','REJECTED'],
        default : 'PENDING'
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    statement : String
});

// Export the Mongoose model
module.exports = mongoose.model('Application', Application);