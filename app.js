'use strict';

require('dotenv').config()

const koa = require('koa');
const common = require('koa-common');
const app = koa();

const logger = require('./modules/logger');

var dbInitCompletePromise = require('q').defer();
app.__dbInitComplete = dbInitCompletePromise.promise;

app.use(common.static(__dirname + '/out'));

app.use(function* errorHandler(next) {
    try {
        yield next;
    } catch (err) {
        this.status = err.status || 500;
        this.body = err.message;
        this.app.emit('error', err, this);
    }
});

const server = require('./modules/service');

server.init(app, dbInitCompletePromise);

const port = process.env.PORT || 5000;

app.__dbInitComplete.then(function () {
    app.listen(port);
    logger.log('info', `server running at http://localhost:${port}`);
});

module.exports = app;