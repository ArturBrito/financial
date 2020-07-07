const { User, validate } = require('../models/user');
const _ = require('lodash');
const logger = require('../startup/logging')

//-- Create new user
exports.create_user = async function (req, res) {
    // Validate inputs
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);    

    // Check if user already exists
    const check_user = await User.getUser(req.body);
    if (check_user) return res.status(400).send('User already registered.');

    // Create new user
    let new_user = new User(req.body);
    //- hash password
    await new_user.hashPass();
    await new_user.createUser()
        .then(result => {   
            const token = User.getToken(new_user);
            res.header('x-auth-token', token).send(_.pick(new_user, ['first_name', 'last_name', 'email']));  
        })
        .catch(err => {
            return res.send(err);
        });
}

//-- Get user
exports.get_user = async function (req, res) {
    const user = await User.getUser(req.user);
    res.send(_.pick(user[0], ['first_name', 'last_name', 'email']));    
}