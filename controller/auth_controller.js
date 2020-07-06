const { User } = require('../models/user');
const bcrypt = require('bcrypt');


exports.login = async function(req, res) {
    const user = await User.getUser(req.body);
    if (!user[0]) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user[0].password);
    if(!validPassword) return res.status(400).send('Invalid email or password');

    const token = User.getToken(user[0]);
    res.send(token);
}