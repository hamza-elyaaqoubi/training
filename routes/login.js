var express = require('express');
var router = express.Router();
var passport = require('passport');

// Render the login page.
router.get('/', function(req, res) {
    res.render('login', { title: 'Login', error: req.flash('error')[0] });
});

// Authenticate a user.
router.post(
    '/',
    passport.authenticate('stormpath',
        {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash: 'Invalid email or password.'
        }
    )
);

module.exports = router;