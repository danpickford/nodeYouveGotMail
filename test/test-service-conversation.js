const app = require('../app');
const request = require('supertest').agent(app.listen());
const chai = require('chai');
const should = chai.should();

describe('Conversation API', function () {

    let conversationId = '-';

    before(function (done) {
        this.timeout(5000); //for train coding.
        app.__dbInitComplete.then(function () {
            done();
        });
    });

    describe('Setup | Ensure users exist', function () {
        it('Add user James Haywood POST', function (done) {
            request
                .post('/user/add')
                .send({
                    'username': 'James Haywood'
                })
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.should.be.json;
                    done();
                });
        });
        it('Add user Daniel Pickford POST', function (done) {
            request
                .post('/user/add')
                .send({
                    'username': 'Daniel Pickford'
                })
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.should.be.json;
                    done();
                });
        });



        describe('Test Conversation CRUD', function () {
            it('should add a new conversation /conversation/add POST', function (done) {
                request
                    .post('/conversation/add')
                    .send({
                        "from": "Daniel Pickford",
                        "to": "James Haywood",
                        "subject": "Technical test tests",
                        "message": "Hi James, please find technical test at https://gitlab.com/Danpickford/15giftsTechTest.git."
                    })
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.should.be.json;
                        res.body[0].should.have.property('subject');
                        res.body[0].subject.should.equal('Technical test tests');
                        res.body[0].should.have.property('id');
                        conversationId = res.body[0].id;
                        done();
                    });
            });

            it('should get conversation by user on /conversation/James Haywood GET', function (done) {
                request
                    .get('/conversation/James Haywood')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.should.be.json;
                        res.body[0].should.have.property('participants');
                        res.body[0].should.have.property('messages');
                        res.body[0].should.have.property('subject');
                        res.body[0].subject.should.equal('Technical test tests');
                        done();
                    });
            });

            it('should add message to existing conversation PUT' + conversationId, function (done) {
                request
                    .put('/conversation')
                    .send({
                        "conversationId": conversationId,
                        "from": "James Haywood",
                        "to": "Daniel Pickford",
                        "message": "Ah Dan nice to hear from you, this looks amazing."
                    })
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.should.be.json;
                        res.body[0].should.have.property('subject')
                        res.body[0].subject.should.equal('Technical test tests');
                        done();
                    });
            });

            it('should add message to existing conversation PUT', function (done) {
                request
                    .put('/conversation')
                    .send({
                        "conversationId": conversationId,
                        "from": "Daniel Pickford",
                        "to": "James Haywood",
                        "message": "Thanks James very kind of you to say."
                    })
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.should.be.json;
                        done();
                    });
            });

            it('should delete the conversation', function (done) {
                request
                    .del('/conversation/' + conversationId)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.should.be.json;
                        res.body[0].should.have.property('id');
                        res.body[0].id.should.equal(conversationId)
                        done();
                    });
            });

        });
    });
    describe('Tidy up', function () {
        it('Delete user James Haywood DEL', function (done) {
            request
                .del('/user/James Haywood')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.should.be.json;
                    res.should.be.json;
                    res.body.should.have.property('INFO');
                    res.body.INFO.should.equal('Destroyed: 1 James Haywood.');
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
                    res.should.be.json;
                    res.body.should.have.property('INFO');
                    res.body.INFO.should.equal('Destroyed: 1 Daniel Pickford.');
                    done();
                });
        });
    });
});