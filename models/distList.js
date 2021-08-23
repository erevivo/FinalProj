var distListDB = require("./mongo")("distList");

function getDistList(name, datestr) {
        return distListDB.findOne({ assignee: name , date:datestr});
}

async function createList(distList) {
        distListDB.insertOne(distList);
}

module.exports = { getDistList, createList };
