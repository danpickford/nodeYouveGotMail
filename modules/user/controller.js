const models = require('../../modules/dal/database').models();
const parse = require('co-body');

module.exports = {

        * findById() {
            this.body = yield models.user.findOne({
                id: this.params.id,
            });
        },


        * create() {
            const body = yield parse.json(this);
            this.body = yield models.user.create(body);
        },


        * destroy() {
            this.body = yield models.user.destroy({
                id: this.params.id,
            });
        },
};