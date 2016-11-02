const winston = require('winston');

var logger = new(winston.Logger)({
    transports: [
      new(winston.transports.Console)({
            level: process.env.LOGLEVEL
        })
    ]
});

module.exports = {

    log(level, message) {
            if (!level) return logger.info(message);
            return logger.log(level, message);
        },

};