/**
 * @author Artur Brito
 * @email artur.brito95@gmail.com
 * @create date 07-07-2020 00:34:38
 * @modify date 07-07-2020 00:34:38
 * @desc Accounts routes
 */
const express = require('express');
const router = express.Router();
const controller = require('../controller/accounts_controller');
const auth = require('../middleware/auth');

//-- Routes
router.get('/', auth, async (req, res) => {
    controller.get_all_accounts(req, res);
});

router.get('/:id', auth, async (req, res) => {    
    controller.get_account_by_id(req, res);
});

router.post('/', (req, res) => {    
    controller.create_account(req, res);
});

router.put('/:id', (req, res) => {   
    controller.update_account_by_id(req, res);    
});

router.delete('/:id', (req, res) => {
    controller.delete_account(req, res);
});


module.exports = router;