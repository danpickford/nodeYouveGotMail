'use strict';

const Waterline = require('waterline');

let conn = null;
let models = null;

module.exports = {

    connect() {
        conn = new Waterline();
        return conn;
    },

    connection: () => conn,

    loadModels(modelsToLoad) {
        models = modelsToLoad;
        return models;
    },

    models: () => models,

};