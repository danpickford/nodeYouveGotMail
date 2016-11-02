var app = require('../app');
var request = require('supertest').agent(app.listen());


describe('Test CRUD on Users API', function () {
    it('Get All', function (done) {
        request.get('/user')
            .expect(200, function (err, res) {
                if (err) return done(err);
                res.should.be.json;
                done();
            });
    });
});