/**
 * @author Artur Brito
 * @email artur.brito95@gmail.com
 * @create date 07-07-2020 00:34:52
 * @modify date 07-07-2020 00:34:52
 * @desc Authentication verification middleware
 */
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // Verify if have token
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provied');

    // Validate if token is valid
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token');
    }
}
