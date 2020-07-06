const { Account, validate } = require('../models/account');

exports.get_all_accounts = function (req, res) {

    Account.getAllAccounts()
        .then(result => {
            if (result.length == 0) return res.status(404).send('No Accounts');
            res.send(result);
        })
        .catch(err => {
            return res.send(err);
        });
};

exports.get_account_by_id = function (req, res) {

    Account.getAccountById(req.params.id)
        .then(result => {
            if (result.length == 0) return res.status(404).send('Account not found');
            res.send(result);
        })
        .catch(err => {
            return res.send(err);
        });
}

exports.create_account = function (req, res) {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const new_account = new Account(req.body);

    new_account.createAccount()
        .then(result => {
            return res.json(result);
        })
        .catch(err => {
            return res.send(err);
        });

}

exports.update_account_by_id = function (req, res) {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let update_account = new Account(req.body);

    update_account.updateById(req.params.id)
        .then(result => {
            return res.json(result);
        })
        .catch(err => {
            return res.send(err);
        });
}

exports.delete_account = function (req, res) {
    Account.remove(req.params.id)
        .then(result => {
            if (result.affectedRows == 0) return res.status(404).send('Account not found');
            res.send(result);
        })
        .catch(err => {
            return res.send(err);
        });
}