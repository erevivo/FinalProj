var distListDB = require("./mongo")("distList");

function getDistList(id, datestr) {
        return distListDB.findOne({ assignee: id , date:datestr});
}

async function createList(distList) {
        distListDB.insertOne(distList);
}

module.exports = { getDistList, createList };
