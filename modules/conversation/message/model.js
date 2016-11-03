'use strict';

const mongo = require('sails-mongo');
const Waterline = require('waterline');

    /**
     * Message Model
     *
     * @module messageModel
     */
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
        from: {
            model: 'user'
        },
        to: {
            model: 'user'
        },
        date: 'datetime',
        seen: 'boolean',
        messageText: 'string'
    },
});