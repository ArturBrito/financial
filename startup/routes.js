//const express = require('express');
const accounts = require('../routes/accounts');
const bodyParser = require('body-parser');

module.exports = function (app) {
    //app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/api/accounts', accounts);
}