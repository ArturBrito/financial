const express = require('express');
const router = express.Router();
const Account = require('../models/account');


router.get('/', async (req, res) => {

    Account.getAllAccounts(function (err, account) {
        if (err) res.send(err);
        console.log('Accounts', account);
        res.send(account);
    });

});

router.get('/:id', async (req, res) => {
    Account.getAccountById(req.params.id, function (err, account) {
        if (err) res.send(err);
        res.send(account);
    });
});

router.post('/', (req, res) => {
    const new_account = new Account(req.body);

    Account.createAccount(new_account, function (err, account) {
        if (err)
            res.send(err);
        res.json(account);
    });

});

router.put('/:id', (req, res) => {
    Account.updateById(req.params.id, new Account(req.body), function (err, account) {
        if (err)
            res.send(err);
        res.json(account);
    });

});

router.delete('/:id', (req, res) => {
    Account.remove(req.params.id, function(err, account) {
        if(err) res.send(err);
        res.json(account);
    });
});


module.exports = router;