const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const config = require('config');
const jwt = require('jsonwebtoken');
const logger = require('../startup/logging')

exports.create_user = async function (req, res) {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);    

    const check_user = await User.getUser(req.body);
    if (check_user) return res.status(400).send('User already registered.');

    let new_user = new User(req.body);
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

exports.get_user = async function (req, res) {
    console.log(req);
    const user = await User.getUser(req.user);
    res.send(_.pick(user[0], ['first_name', 'last_name', 'email']));    

}