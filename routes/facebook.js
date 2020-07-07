/**
 * @author Artur Brito
 * @email artur.brito95@gmail.com
 * @create date 07-07-2020 14:57:42
 * @modify date 07-07-2020 14:57:42
 * @desc Login API facebook
 */


//-- Start facebook API
require('../startup/facebook_api');

const express = require('express');
const router = express.Router();
const passport = require('passport');
session = require('express-session')

router.use(passport.initialize());
router.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: false }));
router.use(passport.initialize());
router.use(passport.session());

//-- Passport session setup.
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

//-- Facebook API routes
// If authenticated with FB send message
router.get('/', ensureAuthenticated, (req, res) => {
    //res.render('index', { user: req.user });   
    res.send('Logged with facebook');
})

// Route to authenticate
router.get('/auth', passport.authenticate('facebook', { scope: 'email' }));

// Callback
router.get('/auth/callback',
    passport.authenticate('facebook', { successRedirect: '/api/facebook', failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    }
);

// Logout
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/api/facebook');
});

// Middleware verification
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    //res.redirect('/api/facebook/login')
    res.status(503).send('Not logged in');
}

/*router.get('/account', ensureAuthenticated, function (req, res) {
    res.render('account', { user: req.user });
});*/

module.exports = router;