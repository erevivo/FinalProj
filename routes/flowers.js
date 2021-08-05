var express = require("express");
var router = express.Router();
var { flowers } = require('../database/database');
var { currentSessions } = require('../database/common');
var { getFlowers } = require('../models/flowers');
/* GET home page. */
router.get("/", async function(req, res) {
    res.render("flowerList", {
        flowers: await getFlowers(),
        isLoggedIn: req.sessionID in currentSessions,
    });
});


module.exports = router;