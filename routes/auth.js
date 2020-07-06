/**
 * @author Artur Brito
 * @email artur.brito95@gmail.com
 * @create date 07-07-2020 00:34:20
 * @modify date 07-07-2020 00:34:20
 * @desc Authentication routes
 */
const controller = require('../controller/auth_controller');
const express = require('express');
const router = express.Router();

//-- Routes
router.post('/', async (req, res) => {
    controller.login(req, res);   
});

module.exports = router;