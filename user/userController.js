var Config = require('../config/config.js');
var User = require('./userSchema');
var jwt = require('jwt-simple');

module.exports.login = function(req, res){

    if(!req.body.username){
        res.status(400).send('username required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }

    User.findOne({username: req.body.username}, function(err, user){
        if (err) {
            res.status(500).send(err);
            return
        }

        if (!user) {
            res.status(401).send('Invalid Credentials');
            return;
        }
        user.comparePassword(req.body.password, function(err, isMatch) {
            if(!isMatch || err){
                res.status(401).send('Invalid Credentials');
            } else {
                res.status(200).json({token: createToken(user)});
            }
        });
    });

};

module.exports.signup = function(req, res){
    if(!req.body.username){
        res.status(400).send('username required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }

    var user = new User();

    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function(err) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json({token: createToken(user)});
    });
};

module.exports.unregister = function(req, res) {
    req.user.remove().then(function (user) {
        res.sendStatus(200);
    }, function(err){
        res.status(500).send(err);
    });
};

function createToken(user) {
    var tokenPayload = {
        user: {
            _id: user._id,
            username: user.username
        }

    };
    return jwt.encode(tokenPayload,Config.auth.jwtSecret);
};

// Create endpoint /user for GET
module.exports.getUsers = function(req, res) {
    console.log("getting users");
    User.find(function(err, users) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(users);
        console.log(users);
    });
};

// Create endpoint /user/:user_id for PUT
exports.putUser = function(req, res) {
    // Use the Beer model to find a specific beer
    User.findByIdAndUpdate(
        req.params.user_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, user) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(user);
        });

};



// Create endpoint /user/:user_id for GET
exports.getUser = function(req, res) {
    // Use the Beer model to find a specific beer
    User.findById(req.params.user_id, function(err, user) {
        if (err) {
            res.status(500).send(err)
            return;
        }
       user.password="";
        res.json(user);

    });
};