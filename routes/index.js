var express = require('express');
var router = express.Router();
var cmn = require('../database/common');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});
router.get("/home", function(req, res) {

    res.render("home");
});

router.get("/about", function(req, res) {
    console.log(req.session);
    res.render("about");
});
router.get("/contact", function(req, res) {
    res.render("contact");
});
router.get("/careers", function(req, res) {
    res.send("ABSOLUTELY NONE");
});
module.exports = router;