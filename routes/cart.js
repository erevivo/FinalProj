var express = require("express");
var router = express.Router();
var { carts, writeJson } = require('../database/database');
var { currentSessions, getDetailedFlowerList, getCartByID } = require('../database/common');
var { setCart, getCartByID } = require('../models/cart');
var { getGroupFlowers } = require('../models/flowers');

router.post("/", function(req, res) {
    let cart = req.body.cart;
    setCart(currentSessions[req.sessionID], cart);
    res.json({ success: true });

});
router.get("/page", async function(req, res) {
    let currentCart = await getCartByID(currentSessions[req.sessionID]);
    let flowerIDs = currentCart.items.map(item => parseInt(item.id));
    let currentFlowers = await getGroupFlowers(flowerIDs);
    let cartWithImages = getDetailedFlowerList(currentCart.items, currentFlowers);
    res.render('cart', { cart: cartWithImages });
});


module.exports = router;