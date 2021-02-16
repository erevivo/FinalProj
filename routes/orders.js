var express = require("express");
var router = express.Router();
var { writeJson, orders } = require('../database/database');
var cmn = require('../database/common');
var currentSessions = cmn.currentSessions;
/* GET home page. */


router.post("/create", function(req, res) {
    let cart = carts[currentSessions[req.sessionID]];
    orders.push({
        userID: currentSessions[req.sessionID],
        price: req.body.totalPrice,
        address: req.body.address,
        description: req.body.description,
        details: cart,
        orderTime: cmn.getCurrentDateTime(),
        isDeployed: false,
        isDelivered: false,
        deliveryTime: null,
        ID: orders.length ? orders.reduce((prev, current) => (prev.ID > current.ID) ? prev : current).ID + 1 : 0
    });
    writeJson('orders', orders);

    carts[currentSessions[req.sessionID]] = [];
    writeJson('carts', carts);

    res.json({ success: true });

});

router.get("/page", (req, res) => {
    let currentUserOrders = orders.filter(order => order.userID == currentSessions[req.sessionID]);
    currentUserOrders = currentUserOrders.map(order => {
        let detailsWithImgs = order.details.map(item => cmn.getDetailedFlowerFromOrderItem(item));
        currentUser = cmn.getUserBy("ID", order.userID);
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

    });
    currentUserOrders.sort((first, second) => cmn.getDateFromString(first.time) < cmn.getDateFromString(second.time) ? 1 : -1)
    res.render('order', { orders: currentUserOrders, isEmployee: false, reloadRoute: "page" });
});

router.get("/all", (req, res) => {
    let currentUser = cmn.getUserBySessID(req.sessionID);
    if (cmn.getAuthLevel(currentUser) < 1) {
        res.json({ success: false, message: "You are unauthorized to see this content" });
        return;
    }
    let ordersForEjs = orders.map(order => {
        let detailsWithImgs = order.details.map(item => cmn.getDetailedFlowerFromOrderItem(item));
        currentUser = cmn.getUserBy("ID", order.userID);
        return {
            userName: currentUser.fname + " " + currentUser.lname,
            address: order.address,
            description: order.description,
            time: order.orderTime,
            details: detailsWithImgs,
            isDeployed: order.isDeployed,
            isDelivered: order.isDelivered,
            ID: order.ID,
            deliveryTime: order.deliveryTime
        };

    });
    console.log(ordersForEjs);
    ordersForEjs.sort((first, second) => cmn.getDateFromString(first.time) < cmn.getDateFromString(second.time) ? 1 : -1)
    res.render('order', { orders: ordersForEjs, isEmployee: true, reloadRoute: "all" });
});

router.post("/deploy", (req, res) => {
    let currentUser = cmn.getUserBySessID(req.sessionID);
    if (cmn.getAuthLevel(currentUser) < 1) {
        res.json({ success: false, message: "You are unauthorized to deploy orders" });
        return;
    }
    let orderID = req.body.id;
    currentOrder = orders.filter(order => order.ID == orderID);
    if (currentOrder.length == 0) {
        res.json({ success: false, message: "That order does not exist" });
        return;
    }
    currentOrder = currentOrder[0];
    if (currentOrder.isDeployed) {
        res.json({ success: false, message: "That order has already been deployed" });
        return;
    }
    currentOrder.isDeployed = true;
    writeJson('orders', orders);
    res.json({ success: true, message: "The order has been successfully deployed" });
});

router.post("/accept", (req, res) => {
    let orderID = req.body.id;
    currentOrder = orders.filter(order => order.ID == orderID);
    if (currentOrder.length == 0) {
        res.json({ success: false, message: "That order does not exist" });
        return;
    }
    currentOrder = currentOrder[0];
    if (!currentOrder.isDeployed) {
        res.json({ success: false, message: "That order has not been deployed" });
        return;
    }
    if (currentOrder.isDelivered) {
        res.json({ success: false, message: "That order has already been delivered" });
        return;
    }
    currentOrder.isDelivered = true;
    currentOrder.deliveryTime = cmn.getCurrentDateTime();
    writeJson('orders', orders);

    res.json({ success: true, message: "The order has been accepted" });
});




module.exports = router;