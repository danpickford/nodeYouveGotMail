const logger = require('../../modules/logger');
const models = require('../../modules/dal/database').models();
const parse = require('co-body');

module.exports = {

        * findByUserName() {
            this.body = yield models.user.findOne().where({
                username: this.params.id
            });
        },


        * create() {
            const body = yield parse.json(this);

            logger.log('debug', `Create user ${body.username}`);

            this.body = yield models.user.find().where({
                username: body.username
            }).then(function (existingUsers) {
                if (existingUsers.length > 0) {
                    return '{ "INFO": "Username already exists choose another."}';
                } else {
                    return models.user.create(body);
                }
            });


        },


        * destroy() {
            logger.log('debug', `Destroy user ${this.params.id}`);

            this.body = yield models.user.find().where({
                username: this.params.id
            }).then(function (users) {

                if (users.length == 0) {
                    return '{ "INFO": "No users found by that name."}';
                }

                var userName = users[0].username;
                users.forEach(user => {
                    user.destroy();
                });
                return '{ "INFO": "Destroyed: ' + users.length + ' ' + userName + '."}';
            })
        },
};