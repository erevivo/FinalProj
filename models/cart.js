var distListDB = require('./mongo')("distList");




function getCartByID(id) {
    return cartDB.findOne({ ID: id });
}

function createCart(id) {
    cartDB.insertOne({ ID: id, items: [] });
}

module.exports = { setCart, getCartByID, createCart };