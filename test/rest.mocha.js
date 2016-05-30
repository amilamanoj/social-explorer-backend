var assert = require('assert');
var request = require('supertest');
var app = require('../app');


describe('REST API test', function () {

    var testuser;

    before(function (done) {

        testuser = {
            //to be received
            _id: undefined,
            //you should make sure this user does not exist yet and eventually choose a different username
            username: "testhans",
            password: "jaskdjasdjkas",
            //to be received
            token: undefined
        };

        //register testuser
        request(app)
            .post("/signup")
            .send({
                username: testuser.username,
                password: testuser.password
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(function (res) {
                assert(res.body.token);

                var tokendata = parseToken(res.body.token);
                assert(tokendata.user.username == testuser.username);

                testuser._id = tokendata.user._id;
                testuser.token = res.body.token;

            })
            .end(done);
    });

    after(function (done) {
        //delete testuser
        request(app)
            .post("/unregister")
            .set("Authorization", "JWT " + testuser.token)
            .expect(200, done);
    });

    it("should login successfully", function (done) {
        request(app)
            .post("/login")
            .send({
                username: testuser.username,
                password: testuser.password
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({token: testuser.token}, done)

    });


    describe('Project lifecycle', function () {

        var testproject;

        before(function (done) {

            testproject = {
                _id: undefined,
                title: "Build a school",
                description: "Help build a school for Jian's village",
                user: testuser._id
            };
            //create the test project
            request(app)
                .post("/api/projects")
                .send({
                    title: testproject.title,
                    year: testproject.year,
                    synopsis: testproject.synopsis,
                    user: testproject.user
                })
                .set("Authorization", "JWT " + testuser.token)
                .expect('Content-Type', /json/)
                .expect(201)
                .expect(function (res) {
                    var created = res.body;
                    assert(testproject.title == created.title);
                    assert(testproject.year == created.year);
                    assert(testproject.synopsis == created.synopsis);
                    assert(testproject.user == created.user);

                    testproject = created;

                })
                .end(done);

        });

        after(function (done) {
            request(app)
                .delete("/api/projects/" + testproject._id)
                .set("Authorization", "JWT " + testuser.token)
                .expect(200, done)
        });

        it('should list all projects', function (done) {

            request(app)
                .get("/api/projects")
                //no authorization
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                    assert(res.body.length > 1);
                })
                .end(done);

        });

        it('should show one project', function (done) {
            request(app)
                .get("/api/projects/" + testproject._id)
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                    assert.deepEqual(testproject, res.body);
                })
                .end(done);


        });

        it('should update one project', function (done) {
            var testprojectCopy = JSON.parse(JSON.stringify(testproject)); //copy testproject object w/o reference
            testprojectCopy.title = "new title";
            request(app)
                .put("/api/projects/" + testproject._id)
                .send(testprojectCopy)
                .set("Authorization", "JWT " + testuser.token)
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                    assert.deepEqual(testprojectCopy, res.body);
                    testproject = testprojectCopy;
                })
                .end(done);


        });


    });

    describe("Deny unauthenticated and unauthorized access", function () {
        var testproject = {
            title: "123"
        };

        before(function () {
            //create test project, maybe another test user to check if authorization works properly
        });

        it("should deny unauthenticated project creating", function (done) {
            request(app)
                .post("/api/projects")
                .send(testproject)
                .expect(401)
                .end(done);

        })
    });
});


function parseToken(token) {
    return JSON.parse(new Buffer(token.split('.')[1], 'base64').toString('ascii'));
}