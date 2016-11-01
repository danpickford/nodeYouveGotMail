'use strict';


const config = require('./dal/config');
const database = require('./dal/database');


module.exports = {

    init(server) {
            const orm = database.connect();
            try {
                const conversation = require(`./modules/conversation/model.js/model`);
                const message require(`./modules/conversation/message/model.js/model`);

                orm.loadCollection(conversation);
                orm.loadCollection(message);
            } catch (err) {
                if (err.code !== 'MODEL_LOAD_FAILURE') {
                    throw new Error(`Error loading models: ${err.message}`);
                }
            }

        }

};