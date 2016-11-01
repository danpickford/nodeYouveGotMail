const winston = require('winston');

module.exports = {

    log(level, message) {
            if (!level) return winston.info(message);
            return winston.log(level, message);
        },

};