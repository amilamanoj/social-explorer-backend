module.exports = ratingRoutes;


function ratingRoutes(passport) {

    var ratingController = require('./ratingController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/ratings')
        .post(ratingController.postRatings)
        .get(ratingController.getRatings);

    router.route('/rating/:rating_id')
        .get(ratingController.getRating)
        .put(ratingController.putRating);
        //.delete(ratingController.deleteRating);

    return router;
}
