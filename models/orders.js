var orderDB = require('./mongo')("orders");


async function getNewID() {
    let highestID = await orderDB.find().sort({ ID: -1 }).limit(1);
    return highestID.ID + 1;
}


async function createOrder(order) {
    order.id = await getCartByID
    cartDB.insertOne({ ID: id, items: [] });
}

function getAllOrders() {
    return orderDB.find({}).toArray();
}

function getOrderBy(key, value) {
    qry = {};
    qry[key] = value;
    return orderDB.findOne(qry);
}

function getOrdersOf(userID) {
    return orderDB.find({ "userID": userID }).toArray();
}

function deployOrder(id) {
    let orderToDeploy = { ID: id };
    let newvalues = { $set: { isDeployed: true } };
    orderDB.updateOne(orderToDeploy, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });
}

function acceptOrder(id, time) {
    let orderToAccept = { ID: id };
    let newvalues = { $set: { isDelivered: true, deliveryTime: time } };
    orderDB.updateOne(orderToAccept, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });
}

module.exports = { createOrder, getOrderBy, getOrdersOf, getAllOrders, deployOrder, acceptOrder };