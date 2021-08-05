var express = require("express");
var router = express.Router();
var {
    currentSessions,
    getCurrentDateTime,
    getDetailedFlowerList,
    getUserBySessID,
    getDateFromString,
    getAuthLevel
} = require('../database/common');
var { getCartByID, setCart } = require('../models/cart');
const { getGroupFlowers } = require("../models/flowers");
var {
    addOrder,
    getOrderBy,
    getOrdersOf,
    getAllOrders,
    deployOrder,
    acceptOrder
} = require('../models/orders');
var { getUserBy } = require('../models/users');

router.post("/create", async function(req, res) {
    let cart = await getCartByID(currentSessions[req.sessionID]);
    newOrder = {
        userID: currentSessions[req.sessionID],
        price: req.body.totalPrice,
        address: req.body.address,
        description: req.body.description,
        details: cart,
        orderTime: getCurrentDateTime(),
        isDeployed: false,
        isDelivered: false,
        deliveryTime: null,
    };
    addOrder(newOrder);
    setCart(currentSessions[req.sessionID], []);
    res.json({ success: true });

});

async function getOrderForEJS(order, currentUser) {
    let flowerIDs = order.details.map(item => item.id);
    let currentOrderFlowers = await getGroupFlowers(flowerIDs);
    console.log(order.details, currentOrderFlowers);
    let detailsWithImgs = getDetailedFlowerList(order.details, currentOrderFlowers);
    return {
        userName: currentUser.fname + " " + currentUser.lname,
        address: order.address,
        description: order.description,
        time: order.orderTime,
        details: detailsWithImgs,
        isDeployed: order.isDeployed,
        isDelivered: order.isDelivered,
        deliveryTime: order.deliveryTime,
        ID: order.ID,
    };


}

router.get("/page", async function(req, res) {
    let currentUser = await getUserBySessID(req.sessionID);
    let currentUserOrders = await getOrdersOf(currentUser.ID);
    for (let i = 0; i < currentUserOrders.length; ++i) {
        currentUserOrders[i] = await getOrderForEJS(currentUserOrders[i], currentUser);
    }
    currentUserOrders.sort((first, second) => getDateFromString(first.time) < getDateFromString(second.time) ? 1 : -1)
    res.render('order', { orders: currentUserOrders, isEmployee: false, reloadRoute: "orders/page" });
});

router.get("/all", async function(req, res) {
    let currentUser = await getUserBySessID(req.sessionID);
    if (getAuthLevel(currentUser) < 1) {
        res.json({ success: false, message: "You are unauthorized to see this content" });
        return;
    }
    let orders = await getAllOrders();
    for (let i = 0; i < orders.length; ++i) {
        let currentUser = await getUserBy("ID", orders[i].userID);
        orders[i] = await getOrderForEJS(orders[i], currentUser);
    }
    orders.sort((first, second) => getDateFromString(first.time) < getDateFromString(second.time) ? 1 : -1)
    res.render('order', { orders: orders, isEmployee: true, reloadRoute: "orders/all" });
});

router.post("/deploy", async function(req, res) {
    let currentUser = await getUserBySessID(req.sessionID);
    if (getAuthLevel(currentUser) < 1) {
        res.json({ success: false, message: "You are unauthorized to deploy orders" });
        return;
    }
    let currentOrder = getOrderBy("ID", req.body.id);
    if (!currentOrder) {
        res.json({ success: false, message: "That order does not exist" });
        return;
    }
    if (currentOrder.isDeployed) {
        res.json({ success: false, message: "That order has already been deployed" });
        return;
    }
    deployOrder(currentOrder.ID)
    res.json({ success: true, message: "The order has been successfully deployed" });
});

router.post("/accept", (req, res) => {
    let currentOrder = getOrderBy("ID", req.body.id);
    if (!currentOrder) {
        res.json({ success: false, message: "That order does not exist" });
        return;
    }
    if (!currentOrder.isDeployed) {
        res.json({ success: false, message: "That order has not been deployed" });
        return;
    }
    if (currentOrder.isDelivered) {
        res.json({ success: false, message: "That order has already been delivered" });
        return;
    }
    acceptOrder(currentOrder.ID, getCurrentDateTime());
    res.json({ success: true, message: "The order has been accepted" });
});




module.exports = router;