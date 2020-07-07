/**
 * @author Artur Brito
 * @email artur.brito95@gmail.com
 * @create date 07-07-2020 00:33:28
 * @modify date 07-07-2020 00:33:28
 * @desc DB configuration file
 */

'user strict';

const mysql = require('mysql');
const config = require('config');

//-- DB connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  
    password: config.get('dbPassword'),
    database: config.get('dbName')  
});

//-- Connect
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;