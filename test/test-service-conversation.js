var app = require('../app');
var request = require('supertest').agent(app.listen());

describe('Conversation API', function () {

    before(function (done) {
        this.timeout(5000); //for train coding.
        app.__dbInitComplete.then(function () {
            done();
        });
    });
    describe('Setup', function () {
        it('Delete user James Haywood DEL', function (done) {
            request.del('/user/James Haywood')
                .expect(200, function (err, res) {
                    if (err) return done(err);
                    done();
                }).expect('Content-Type', /json/)
        });
    });
    describe('Test CRUD', function () {
        it('should list all users on /user GET', function (done) {
            request.get('/user')
                .expect(200, function (err, res) {
                    if (err) return done(err);
                    done();
                }).expect('Content-Type', /json/);
        });
        it('should add one user on /user/add/Dan Pickford POST', function (done) {
            request.post('/user/add')
                .send({
                    "username": "Daniel Pickford"
                })
                .expect(200, function (err, res) {
                    if (err) return done(err);
                    done();
                }).expect('Content-Type', /json/);
        });
        it('should add one user on /user/add/James Haywood POST', function (done) {
            request.post('/user/add')
                .send({
                    "username": "James Haywood"
                })
                .expect(200, function (err, res) {
                    if (err) return done(err);
                    return res.body.username == "James Haywood";
                    done();
                }).expect('Content-Type', /json/);
        });
        it('should inform user exists on /user/add/James Haywood POST', function (done) {
            request.post('/user/add')
                .send({
                    "username": "James Haywood"
                })
                .expect(200, function (err, res) {
                    if (err) return done(err);
                    done();
                }).expect('Content-Type', /json/).expect({
                    'INFO': 'Username already exists choose another.'
                });
        });
        it('should get one user on /user/Joe Fox GET', function (done) {
            request.get('/user/Joe Fox')
                .expect(200, function (err, res) {
                    if (err) return done(err);
                    done();
                }).expect('Content-Type', /json/);
        });
        it('should delete one user on /user/Daniel Pickford DEL', function (done) {
            request.del('/user/Daniel Pickford')
                .expect(200, function (err, res) {
                    if (err) return done(err);
                    done();
                }).expect('Content-Type', /json/)
                .expect({
                    "INFO": "Destroyed: 1 Daniel Pickford."
                });;
        });
        describe('Tidy up', function () {
            it('Delete user James Haywood DEL', function (done) {
                request.del('/user/James Haywood')
                    .expect(200, function (err, res) {
                        if (err) return done(err);
                        done();
                    }).expect('Content-Type', /json/)
                    .expect({
                        "INFO": "Destroyed: 1 James Haywood."
                    });
            });
        });
    });
});