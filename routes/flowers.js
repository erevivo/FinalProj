var express = require("express");
var router = express.Router();
var { flowers } = require('../database/database');
var { currentSessions } = require('../database/common');

/* GET home page. */
router.get("/", function(req, res) {
    res.render("flowerList", {
        flowers: flowers,
        isLoggedIn: req.sessionID in currentSessions,
    });
});


module.exports = router;