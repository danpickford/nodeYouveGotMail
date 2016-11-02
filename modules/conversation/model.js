'use strict';

const mongo = require('sails-mongo');
const Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'conversation',
    tableName: 'conversations',
    adapter: mongo,
    connection: 'cloudMDBConn',
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,
    autoPK: true,
    attributes: {
        participants: {
            collection: 'user',
        },
        messages: {
            collection: 'message',
        },
        datestarted: 'datetime',
        subject: 'string'
    },    
});