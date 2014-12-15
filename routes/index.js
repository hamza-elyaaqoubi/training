var express = require('express');
var router = express.Router();
var passport = require('passport');
var stormpath = require('stormpath');


// Render the home page.
router.get('/', function(req, res) {
    res.render('index', { title: 'Home', user: req.user });
});

module.exports = router;