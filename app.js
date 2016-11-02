require('dotenv').config()

const koa = require('koa');

const app = koa();

const logger = require('./modules/logger');

app.use(function* errorHandler(next) {
    try {
        yield next;
    }
    catch (err) {
        this.status = err.status || 500;
        this.body = err.message;    
        this.app.emit('error', err, this);
    }
});

const server = require('./modules/service');

server.init(app);

const port = process.env.PORT || 5000;

if (!module.parent) app.listen(port);
logger.log('info', `server running at http://localhost:${port}`);

module.exports = app;
