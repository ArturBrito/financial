/**
 * @author Artur Brito
 * @email artur.brito95@gmail.com
 * @create date 07-07-2020 00:32:42
 * @modify date 07-07-2020 00:32:42
 * @desc API Routes
 */

const accounts = require('../routes/accounts');
const users = require('../routes/users');
const auth = require('../routes/auth');
const bodyParser = require('body-parser');

//-- Add routes and parsers to app
module.exports = function (app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/api/accounts', accounts);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
}