/**
 * @author Artur Brito
 * @email artur.brito95@gmail.com
 * @create date 07-07-2020 00:34:07
 * @modify date 07-07-2020 00:34:07
 * @desc Users routes
 */


const controller = require('../controller/users_controller');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

//-- Routes
router.post('/', async (req, res) => {
    controller.create_user(req, res);
});

router.get('/me', auth, (req, res) => {   
    controller.get_user(req, res);
})

module.exports = router;