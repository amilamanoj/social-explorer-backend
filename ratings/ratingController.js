var Rating = require('./ratingSchema');

exports.postRatings = function(req, res) {

    var rating = new Rating(req.body);

    //do not allow user to fake identity. The user who postet the rating must be the same user that is logged in
    if (!req.user.equals(rating.createUser)) {
        console.log("getting test");
        res.sendStatus(401);
    }

    rating.save(function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json(m);
    });
};

// Create endpoint /api/rating for GET
exports.getRatings = function(req, res) {
    console.log("getting rating");
    Rating.find(function(err, rating) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(rating);
    });
};


// Create endpoint /api/rating/:rating_id for GET
exports.getRating = function(req, res) {
    // Use the Beer model to find a specific beer
    Rating.findById(req.params.rating_id, function(err, rating) {
        if (err) {
            res.status(500).send(err)
            return;
        };

        res.json(rating);
    });
};

// Create endpoint /api/rating/:rating_id for PUT
exports.putRating = function(req, res) {
    // Use the Beer model to find a specific beer
    Rating.findByIdAndUpdate(
        req.params.rating_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, rating) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(rating);
        });

};

// Create endpoint /api/rating/:rating_id for DELETE
exports.deleteRating = function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Rating.findById(req.params.rating_id, function(err, m) {
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