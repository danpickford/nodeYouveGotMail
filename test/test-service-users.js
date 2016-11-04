const app = require('../app');
const request = require('supertest').agent(app.listen());
const chai = require('chai');
const should = chai.should();

describe('User API', function () {

    before(function (done) {
        this.timeout(5000); //for train coding.
        app.__dbInitComplete.then(function () {
            done();
        });
    });
    describe('Setup | Clear database for integration tests', function () {
        it('Delete user James Haywood DEL', function (done) {
            request
                .del('/user/James Haywood')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.should.be.json;
                    done();
                });
        });
        it('Delete user Daniel Pickford DEL', function (done) {
            request
                .del('/user/Daniel Pickford')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.should.be.json;
                    done();
                });
        });

        describe('Test User CRUD', function () {
            it('should add one user on /user/add/Daniel Pickford POST', function (done) {
                request
                    .post('/user/add')
                    .send({
                        'username': 'Daniel Pickford'
                    })
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.should.be.json;
                        res.body.should.have.property('username');
                        res.body.username.should.equal('Daniel Pickford');
                        this.username = res.body.username;
                        done();
                    });
            });

            it('should add one user on /user/add/James Haywood POST', function (done) {
                request
                    .post('/user/add')
                    .send({
                        'username': 'James Haywood'
                    })
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.should.be.json;
                        res.body.should.have.property('username');
                        res.body.username.should.equal('James Haywood');
                        this.username = res.body.username;
                        done();
                    });
            });

            it('should inform user exists on /user/add/James Haywood POST', function (done) {
                request.post('/user/add')
                    .send({
                        'username': 'James Haywood'
                    })
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.should.be.json;
                        res.body.should.have.property('INFO');
                        res.body.INFO.should.equal('Username already exists choose another.');
                        done();
                    });
            });
            it('should get one user on /user/James Haywood GET', function (done) {
                request.get('/user/James Haywood')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.should.be.json;
                        res.body.should.have.property('username');
                        res.body.username.should.equal('James Haywood');
                        done();
                    });
            });
            it('should delete one user on /user/James Haywood DEL', function (done) {
                request
                    .del('/user/James Haywood')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.should.be.json;
                        res.body.should.have.property('INFO');
                        res.body.INFO.should.equal('Destroyed: 1 James Haywood.');
                        done();
                    });
            });
            it('should delete one user on /user/Daniel Pickford DEL', function (done) {
                request
                    .del('/user/Daniel Pickford')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.should.be.json;
                        res.body.should.have.property('INFO');
                        res.body.INFO.should.equal('Destroyed: 1 Daniel Pickford.');
                        done();
                    });
            });
            it('should list all users on /user GET', function (done) {
            request
                .get('/user')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.should.be.json;
                    done();
                });
        });

        });
    });
});