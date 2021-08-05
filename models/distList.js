var distListDB = require("./mongo")("distList");

function getDistList(id) {
        return distListDB.findOne({ ID: id });
}

async function getNewID() {
        let highestID = await distListDB.find().sort({ ID: -1 }).limit(1);
        return highestID.ID + 1;
}

async function createList(distList) {
        distList.ID = await getNewID();
        distListDB.insertOne(distList);
}

module.exports = { setCart, getCartByID, createCart };
