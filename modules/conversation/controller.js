const models = require('../../modules/dal/database').models();
const parse = require('co-body');

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
            this.body = yield yield models.conversation.messages.create(body);
        },

};