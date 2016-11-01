'use strict';

const router = require('koa-router')();

const controller = require('./controller');

const apiRoot = '/conversation';


module.exports = (server) => {
    router
        .get(`${apiRoot}/:id`, controller.findById)
        .put(`${apiRoot}/:id`, controller.update)
        .del(`${apiRoot}/:id`, controller.destroy)
        .post(`${apiRoot}/add`, controller.create)
    server.use(router.routes());
};