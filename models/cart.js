var cartDB = require('./mongo')("carts");


function setCart(id, items) {
    let currentCart = { ID: id };
    let newvalues = { $set: { items: items } };
    cartDB.updateOne(currentCart, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });
}

function getCartByID(id) {
    return cartDB.findOne({ ID: id });
}

function createCart(id) {
    cartDB.insertOne({ ID: id, items: [] });
}

module.exports = { setCart, getCartByID, createCart };