'user strict';

const sql = require('../startup/db');
const Joi = require('joi');

//Task object constructor
var Account = function (account) {
    this.account_name = account.account_name;
    this.balance = account.balance;
};


function validateAccount(account) {
    const schema = {
        account_name: Joi.string().min(3).required(),
        balance: Joi.number().required()
    };

    return Joi.validate(account, schema);
}

Account.createAccount = function (newAccount, result) {
    sql.query("INSERT INTO accounts set ?", newAccount, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Account.getAccountById = function (accountID, result) {
    sql.query("Select * from accounts where account_id = ? ", accountID, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }        
    });

};
Account.getAllAccounts = function (result) {
    sql.query("Select * from accounts", function (err, res) {

        if (err) {
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Account.updateById = function (id, account, result) {
    sql.query("UPDATE accounts SET balance = ? WHERE account_id = ?", [account.balance, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Account.remove = function (id, result) {
    sql.query("DELETE FROM accounts WHERE account_id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {

            result(null, res);
        }
    });
};

exports.Account = Account;
exports.validate = validateAccount;