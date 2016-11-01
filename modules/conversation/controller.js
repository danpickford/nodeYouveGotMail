const models = require('../../config/database').models();
const userLogin = require('./bi/messageHandler');

module.exports = {

        * findById() {
            this.body = yield models.conversation.findOne({
                id: this.params.id,
            });
        },


        * create() {
            const body = yield parse.json(this);
            this.body = yield models.conversation.create(body);
        },


        * destroy() {
            this.body = yield models.conversation.destroy({
                id: this.params.id,
            });
        },

        * update() {
            const body = yield parse.json(this);
            this.body = yield userLogin.login(body.email, body.password);
        },


};