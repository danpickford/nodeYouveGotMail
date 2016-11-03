'use strict';

const router = require('koa-router')();

const controller = require('./controller');

const apiRoot = '/conversation';

/**
 * Conversation Routes
 *
 * @module conversationRoutes
 */
module.exports = (server) => {
    router
        .get(`${apiRoot}/:id`, controller.findByUserName)
        .put(`${apiRoot}/`, controller.update)
        .del(`${apiRoot}/:id`, controller.destroy)
        .post(`${apiRoot}/add`, controller.create)
    server.use(router.routes());
};