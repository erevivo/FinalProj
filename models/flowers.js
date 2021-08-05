var flowerDB = require('./mongo')("flowers");



function getFlowers() {
    return flowerDB.find().toArray();
}

function getFlowerByID(id) {
    return flowerDB.findOne({ ID: id });
}

function getGroupFlowers(idArray) {
    return flowerDB.find({ ID: { $in: idArray } }).toArray();
}

module.exports = {
    getFlowers,
    getFlowerByID,
    getGroupFlowers
};