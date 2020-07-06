const express = require('express');
const router = express.Router();
const { Account, validate } = require('../models/account');



router.get('/', async (req, res) => {
    
    Account.getAllAccounts(function (err, account) {
        if (err) return res.send(err);
        if (account.length == 0) return res.status(404).send('No Accounts');
        res.send(account);
    });

});

router.get('/:id', async (req, res) => {

    Account.getAccountById(req.params.id, function (err, account) {
        if (err) return res.send(err);
        if (account.length == 0) return res.status(404).send('Account not found');
        res.send(account);
    });
});

router.post('/', (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const new_account = new Account(req.body);
    Account.createAccount(new_account, function (err, account) {
        if (err) return res.send(err);
        res.json(account);
    });

});

router.put('/:id', (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    Account.updateById(req.params.id, new Account(req.body), function (err, account) {
        if (err) return res.send(err);
        if (account.affectedRows == 0) return res.status(404).send('Account not found');
        res.json(account);
    });

});

router.delete('/:id', (req, res) => {
    Account.remove(req.params.id, function (err, account) {
        if (err) return res.send(err);
        if (account.affectedRows == 0) return res.status(404).send('Account not found');
        res.json(account);
    });
});


module.exports = router;