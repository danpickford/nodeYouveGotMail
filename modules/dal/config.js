'use strict';

const mongoAdapter = require('sails-mongo');

module.exports = {

    baseUrl: process.env.BASE_URL,
    database: {
        adapters: {
            default: mongoAdapter,
            mongo: mongoAdapter,
        },
        connections: {
            myLocalMongo: {
                adapter: 'mongo',
                module: 'sails-mongo',
                dbConnectionLimit: 10,
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                database: process.env.DB_NAME,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
            },
        },
        defaults: {
            migrate: 'safe',
        },
    }