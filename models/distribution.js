var distributionDB = require("./mongo")("distributions");

function getDistributions() {
        return distributionbDB.find().toArray();
}

function getDistrubutionsFromList(distList) {
        return distributionDB.find({ ID: { $in: distList.list } }).toArray();
}

function addDistribution(distribution) {
        distribution.ID = await getNewID();
        distributionDB.insertOne(distribution);
}

async function getNewID() {
        let highestID = await distributionDB.find().sort({ ID: -1 }).limit(1);
        return highestID.ID + 1;
}

module.exports = {
        getDistributions,
        addDistribution,
        getDistrubutionsFromList,
};
