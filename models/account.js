/**
 * @author Artur Brito
 * @email artur.brito95@gmail.com
 * @create date 07-07-2020 00:36:34
 * @modify date 07-07-2020 00:36:34
 * @desc Account Model
 */
'user strict';

const sql = require('../startup/db');
const Joi = require('joi');

//-- Input schema validation
function validateAccount(account) {
    const schema = {
        account_name: Joi.string().min(3).required(),
        balance: Joi.number()
    };
    return Joi.validate(account, schema);
}

//-- Account model
class Account {
    constructor(account_constructor) {
        this.account = {
            account_name: account_constructor.account_name,
            balance: account_constructor.balance
        }
    }

    /**
     * Return a Promise<br>
     * On fulfilled create new account on the database with the instantiated account
     */
    createAccount = function () {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO accounts set ?", this.account, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res.insertId);
                }
            });
        });
    }

    /**
     * Return a Promise<br>
     * On fulfilled update account on the database with the instantiated account
     * @param {Number} id Account ID
     */
    updateById = function (id) {
        return new Promise((resolve, reject) => {
            sql.query("UPDATE accounts SET ? WHERE account_id = ?", [this.account, id], function (err, res) {
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
     * Return a Promise<br>
     * On fulfilled return an account based on given ID
     * @param {Number} id Account ID
     */
    static getAccountById = function (id) {
        return new Promise((resolve, reject) => {
            sql.query("Select * from accounts where account_id = ? ", id, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    }

    /**
     * Return a Promise<br>
     * On fulfilled return all accounts
     */
    static getAllAccounts = function () {
        return new Promise((resolve, reject) => {
            sql.query("Select * from accounts", function (err, res) {

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
     * Return a Promise<br>
     * On fulfilled delete an account based on given ID
     * @param {Number} id Account ID
     */
    static remove = function (id) {
        return new Promise((resolve, reject) => {
            sql.query("DELETE FROM accounts WHERE account_id = ?", [id], function (err, res) {

                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    };

}

exports.Account = Account;
exports.validate = validateAccount;