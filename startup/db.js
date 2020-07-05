'user strict';

const mysql = require('mysql');
const config = require('config');

//local mysql db connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  
    password: config.get('dbPassword'),
    database: config.get('dbName')  
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;