'use strict';

const models = require('../../../modules/dal/database').models();

module.exports = {

    * findUserByName(criteria) {
        return yield models.user.findOne({
            username: criteria
        });
    },

};