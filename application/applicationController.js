var Application = require('./applicationSchema');

exports.postApplication = function(req, res) {

    var application = new Application(req.body);

    //do not allow user to fake identity. The user who post the application must be the same user that is logged in
    if (!req.user.equals(application.applicant)) {
        res.sendStatus(401);
    }

    application.save(function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json(m);
    });
};

// Create endpoint /api/applications for GET
exports.getApplications = function(req, res) {
    console.log("getting applications");
    Application.find(req.query, function(err, applications) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(applications);
    });
};


// Create endpoint /api/applications/:application_id for GET
exports.getApplication = function(req, res) {
    // Use the Beer model to find a specific beer
    Application.findById(req.params.application_id, function(err, application) {
        if (err) {
            res.status(500).send(err)
            return;
        };
        res.json(application);
    });
};

// Create endpoint /api/applications/:application_id for PUT
exports.putApplication = function(req, res) {
    // Use the Beer model to find a specific beer
    Application.findByIdAndUpdate(
        req.params.application_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, application) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(application);
    });

};

// Create endpoint /api/applications/:application_id for DELETE
exports.deleteApplication = function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Application.findById(req.params.application_id, function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        //authorize
        if (m.applicant && req.user.equals(m.applicant)) {
            m.remove();
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }

    });
};