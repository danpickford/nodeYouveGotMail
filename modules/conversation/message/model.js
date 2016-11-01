'use strict';

const mongo = require('sails-mongo');
const Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'message',
    tableName: 'messages',
    adapter: mongo,
    connection: 'cloudMDBConn',
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,
    autoPK: true,
    attributes: {
        date: 'datetime',
        seen: 'boolean',
        subject: 'string',
        messageText: ''
    },
});