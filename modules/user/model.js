'use strict';

const mongo = require('sails-mongo');
const Waterline = require('waterline');

/**
 * User Model
 *
 * @module userModel
 */
module.exports = Waterline.Collection.extend({
    identity: 'user',
    tableName: 'users',
    adapter: mongo,
    connection: 'cloudMDBConn',
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,
    autoPK: true,
    attributes: {
        username: 'string'
    },
});