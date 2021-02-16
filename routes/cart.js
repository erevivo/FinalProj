var express = require("express");
var router = express.Router();
var { carts } = require('../database/database');
var { currentSessions } = require('../database/common');

/* GET home page. */


router.post("/", function(req, res) {
    let cart = req.body.cart;
    carts[currentSessions[req.sessionID]] = cart;
    writeJson('carts', carts);
    res.json({ success: true });

});
router.get("/page", (req, res) => {
    let cartWithImages = carts[currentSessions[req.sessionID]].map(item => getDetailedFlowerFromOrderItem(item));
    res.render('/cart', { cart: cartWithImages });
});


module.exports = router;