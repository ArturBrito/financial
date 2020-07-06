/**
 * @author Artur Brito
 * @email artur.brito95@gmail.com
 * @create date 07-07-2020 00:36:00
 * @modify date 07-07-2020 00:36:00
 * @desc User Model
 */
'user strict';

const sql = require('../startup/db');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require('../startup/logging');

//-- Input schema validation
function validateUser(user) {
    const schema = {
        first_name: Joi.string().min(3).required(),
        last_name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    };
    return Joi.validate(user, schema);
}

//-- User model
class User {
    constructor(user_constructor) {
        this.user = {
            first_name: user_constructor.first_name,
            last_name: user_constructor.last_name,
            email: user_constructor.email,
            password: user_constructor.password,
        }
    }

    /**
     * Return a Promise<br>
     * On fulfilled hash the password with bcrypt
     */
    hashPass = async function () {
        return new Promise(async (resolve, reject) => {
            const salt = await bcrypt.genSalt(10);
            this.user.password = await bcrypt.hash(this.user.password, salt);
            resolve(true);
        });    
    }

    /**
     * Return a Promise<br>
     * On fulfilled create new user on the database with the instantiated user
     */
    createUser = function () {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO users set ?", this.user, function (err, res) {

                if (err) {
                    reject(err);
                }
                else {
                    resolve(res.insertId);
                }
            });
        });

    };

    /**
     * Return a Promise<br>
     * On fulfilled return the User from the database
     * @param {Object} user User object with email propretie
     */
    static getUser = function (user) {
        return new Promise((resolve, reject) => {
            sql.query("SELECT * FROM users WHERE email = ?", user.email, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    };

    /**
     * Return Web Token
     * @param {Object} user User object with propreties to create a token
     */
    static getToken = function (user) {
        return jwt.sign({ email: user.email }, config.get('jwtPrivateKey'));;
    }
}

exports.User = User;
exports.validate = validateUser;