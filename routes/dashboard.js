var express = require('express');
var router = express.Router();


// Render the dashboard page.
router.get('/', function (req, res) {
    if (!req.user || req.user.status !== 'ENABLED') {
        return res.redirect('/login');
    }
    console.log("userrrrr")
    res.render('dashboard', {title: 'Dashboard', user: req.user, username: req.user.username});
});

module.exports = router;