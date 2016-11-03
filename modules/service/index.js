'use strict';

const config = require('../../modules/dal/config');
const database = require('../../modules/dal/database');
const logger = require('../../modules/logger');


/**
 * App
 *
 * @module app
 */

module.exports = {

    init(service, initWaterlineComplete) {
        const orm = database.connect();
        try {
            const user = require(`../../modules/user/model`);
            const conversation = require(`../../modules/conversation/model`);
            const message = require(`../../modules/conversation/message/model`);

            orm.loadCollection(user);
            orm.loadCollection(conversation);
            orm.loadCollection(message);
        } catch (err) {
            if (err.code !== 'MODEL_LOAD_FAILURE') {
                throw new Error(`Error loading models: ${err.message}`);
            }
        }

        orm.initialize(config.database, (er, models) => {
            if (er) throw er;
            database.loadModels(models.collections);
            try {
                const conversationRoutes = require(`../../modules/conversation/routes`);
                const userRoutes = require(`../../modules/user/routes`);
                conversationRoutes(service);
                userRoutes(service);
            } catch (err) {
                if (err.code !== 'ROUTE_LOAD_FAILURE') {
                    throw new Error(`Error loading routes: ${err.message}`);
                }
            }
            initWaterlineComplete.resolve();
        });
    },
};