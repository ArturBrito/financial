const { Account, validate } = require('../models/account');

//-- Get all accounts
exports.get_all_accounts = function (req, res) {
    Account.getAllAccounts()
        .then(result => {
            // Check if are accounts
            if (result.length == 0) return res.status(404).send('No Accounts');

            res.send(result);
        })
        .catch(err => {
            return res.send(err);
        });
};

//-- Get account by ID
exports.get_account_by_id = function (req, res) {
    Account.getAccountById(req.params.id)
        .then(result => {
            // Check if are accounts
            if (result.length == 0) return res.status(404).send('Account not found');
            res.send(result);
        })
        .catch(err => {
            return res.send(err);
        });
}

//-- Create new account
exports.create_account = function (req, res) {
    // Validate inputs
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Instanciate new account
    const new_account = new Account(req.body);
    // Create
    new_account.createAccount()
        .then(result => {
            return res.json(result);
        })
        .catch(err => {
            return res.send(err);
        });
}

//-- Update account
exports.update_account_by_id = function (req, res) {
    // Validate inputs
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Instanciate account
    let update_account = new Account(req.body);

    // Update
    update_account.updateById(req.params.id)
        .then(result => {
            return res.json(result);
        })
        .catch(err => {
            return res.send(err);
        });
}

// Delete account
exports.delete_account = function (req, res) {
    Account.remove(req.params.id)
        .then(result => {
            // Check if account exist
            if (result.affectedRows == 0) return res.status(404).send('Account not found');
            res.send(result);
        })
        .catch(err => {
            return res.send(err);
        });
}