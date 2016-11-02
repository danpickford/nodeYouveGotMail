'use strict';

const router = require('koa-router')();

const controller = require('./controller');

const apiRoot = '/user';


module.exports = (server) => {
    router
        .get(`${apiRoot}`, controller.getAll)
        .get(`${apiRoot}/:id`, controller.findByUserName)
        .del(`${apiRoot}/:id`, controller.destroy)
        .post(`${apiRoot}/add`, controller.create)
    server.use(router.routes());
};