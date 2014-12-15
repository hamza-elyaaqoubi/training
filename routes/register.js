var express = require('express');
var router = express.Router();
var passport = require('passport');
var stormpath = require('stormpath');


// Render the registration page.
router.get('/', function(req, res) {
    res.render('register', { title: 'Register', error: req.flash('error')[0] });
});


// Register a new user to Stormpath.
router.post('/', function(req, res) {

    var username = req.body.username;
    var password = req.body.password;

    // Grab user fields.
    if (!username || !password) {
        return res.render('register', { title: 'Register', error: 'Email and password required.' });
    }

    // Initialize our Stormpath client.
    var apiKey = new stormpath.ApiKey(
        process.env['STORMPATH_API_KEY_ID'],
        process.env['STORMPATH_API_KEY_SECRET']
    );
    var spClient = new stormpath.Client({apiKey: apiKey});

    // Grab our app, then attempt to create this user's account.
    spClient.getApplication(process.env['STORMPATH_APP_HREF'], function(err, app) {
        if (err) throw err;

        app.createAccount({
            givenName: 'John',
            surname: 'Smith',
            username: username,
            email: username,
            password: password
        }, function (err, createdAccount) {
            if (err) {console.log("user has been created");
                return res.render('register', {'title': 'Register', error: err.userMessage });
            } else {
                console.log("user has been created");
                passport.authenticate('stormpath')(req, res, function () {
                    return res.redirect('/dashboard');
                });
            }
        });

    });

});

module.exports = router;