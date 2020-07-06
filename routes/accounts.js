const express = require('express');
const router = express.Router();
const { validate } = require('../models/account');
const controller = require('../controller/accounts_controller');


router.get('/', async (req, res) => {
    controller.get_all_accounts(req, res);
});

router.get('/:id', async (req, res) => {

    controller.get_account_by_id(req, res);
});

router.post('/', (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    controller.create_account(req, res);

});

router.put('/:id', (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    controller.update_account_by_id(req, res);    

});

router.delete('/:id', (req, res) => {
    controller.delete_account(req, res);
});


module.exports = router;