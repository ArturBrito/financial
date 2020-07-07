const { User } = require('../models/user');
const bcrypt = require('bcrypt');

//-- Authenticate
exports.login = async function(req, res) {
    // Validate inputs
    const user = await User.getUser(req.body);
    if (!user[0]) return res.status(400).send('Invalid email or password');

    // Check if password match
    const validPassword = await bcrypt.compare(req.body.password, user[0].password);
    if(!validPassword) return res.status(400).send('Invalid email or password');

    // Generate token
    const token = User.getToken(user[0]);
    res.send(token);
}