var express = require('express');
var router = express.Router();

// Logout the user, then redirect to the home page.
router.get('/', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;