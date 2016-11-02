const logger = require('../../modules/logger');
const models = require('../../modules/dal/database').models();
const parse = require('co-body');
const userHelper = require('../../modules/service/helpers/conversation');

module.exports = {

        * findByUserName() {
            this.body = yield userHelper.findUserByName(this.params.id);
        },


        * create() {
            const body = yield parse.json(this);

            logger.log('debug', `Create user ${body.username}`);

            this.body = yield models.user.find().where({
                username: body.username
            }).then(function (existingUsers) {
                if (existingUsers.length > 0) {
                    return JSON.parse('{ "INFO": "Username already exists choose another."}');
                } else {
                    return models.user.create(body);
                }
            });


        },
            
        * getAll() {
          this.body = yield models.user.find();
        },

        * destroy() {
            logger.log('debug', `Destroy user ${this.params.id}`);

            this.body = yield models.user.find().where({
                username: this.params.id
            }).then(function (users) {

                if (users.length == 0) {
                    return JSON.parse('{ "INFO": "No users found by that name."}');
                }

                var userName = users[0].username;
                users.forEach(user => {
                    user.destroy();
                });
                return JSON.parse('{ "INFO": "Destroyed: ' + users.length + ' ' + userName + '."}');
            })
        },
};