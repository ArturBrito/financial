const { Account, validate } = require('../models/account');
const logger = require('../startup/logging');

exports.get_all_accounts = function (req, res) {
    Account.getAllAccounts(function (err, account) {
        if (err) return res.send(err);
        if (account.length == 0) return res.status(404).send('No Accounts');
        res.send(account);
    });
};

exports.get_account_by_id = function (req, res) {
    Account.getAccountById(req.params.id, function (err, account) {
        if (err) return res.send(err);
        if (account.length == 0) return res.status(404).send('Account not found');
        
        res.send(account);
    });
}

exports.create_account = function(req, res) {
    const new_account = new Account(req.body);
    Account.createAccount(new_account, function (err, account) {
        if (err) return res.send(err);
        res.json(account);
    });
}

exports.update_account_by_id = function(req, res) {
    Account.updateById(req.params.id, new Account(req.body), function (err, account) {
        if (err) return res.send(err);
        if (account.affectedRows == 0) return res.status(404).send('Account not found');
        res.json(account);
    });
}

exports.delete_account = function(req, res) {
    Account.remove(req.params.id, function (err, account) {
        if (err) return res.send(err);
        if (account.affectedRows == 0) return res.status(404).send('Account not found');
        res.json(account);
    });
}