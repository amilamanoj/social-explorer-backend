var Project = require('./projectSchema');

exports.postProject = function(req, res) {

    var project = new Project(req.body);

    //do not allow user to fake identity. The user who postet the project must be the same user that is logged in
    if (!req.user.equals(project.user)) {
        res.sendStatus(401);
    }

    project.save(function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json(m);
    });
};

// Create endpoint /api/projects for GET
exports.getProjects = function(req, res) {
    // Project.find(function(err, projects) {
    //     if (err) {
    //         res.status(500).send(err);
    //         return;
    //     }
    //     res.json(projects);
    // });
    console.log("getting projects");
    testproject1 = {
        _id: 1,
        title: "Build a school",
        description: "Help build a school for Jian's village",
    };
    testproject2 = {
        _id: 1,
        title: "Teach english",
        description: "Help teach English to Nico's class",
    };
    res.json([testproject1, testproject2]);
};


// Create endpoint /api/projects/:project_id for GET
exports.getProject = function(req, res) {
    // Use the Beer model to find a specific beer
    Project.findById(req.params.project_id, function(err, project) {
        if (err) {
            res.status(500).send(err)
            return;
        };

        res.json(project);
    });
};

// Create endpoint /api/projects/:project_id for PUT
exports.putProject = function(req, res) {
    // Use the Beer model to find a specific beer
    Project.findByIdAndUpdate(
        req.params.project_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, project) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(project);
    });

};

// Create endpoint /api/projects/:project_id for DELETE
exports.deleteProject = function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Project.findById(req.params.project_id, function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        //authorize
        if (m.user && req.user.equals(m.user)) {
            m.remove();
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }

    });
};