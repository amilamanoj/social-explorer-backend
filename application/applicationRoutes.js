module.exports = applicationRoutes;


function applicationRoutes(passport) {

    var applicationController = require('./applicationController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/applications')
        .post(applicationController.postApplication)
        .get(applicationController.getApplications);

    router.route('/applications/:application_id')
        .get(applicationController.getApplication)
        .put(applicationController.putApplication)
        .delete(applicationController.deleteApplication);

    return router;
}
