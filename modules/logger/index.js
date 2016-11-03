const winston = require('winston');

var logger = new(winston.Logger)({
    transports: [
      new(winston.transports.Console)({
            level: process.env.LOGLEVEL
        })
    ]
});
/**
 * logger module
 *
 * @module logger
 */
module.exports = {
/**Set level in .ENV file.
@param level {string}
@param message {string}
*/
    log(level, message) {
            if (!level) return logger.info(message);
            return logger.log(level, message);
        },

};