'user strict';
const sql = require('../startup/db');

//Task object constructor
var Account = function (account) {
    this.account_name = account.account_name;
    this.balance = account.balance;
};

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
Account.remove = function(id, result){
     sql.query("DELETE FROM accounts WHERE account_id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports = Account;