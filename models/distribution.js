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
        let highestArray = distributionDB
                .find()
                .project({ _id: 0, ID: 1 })
                .sort({ ID: -1 })
                .limit(1);
        let highestID = await highestArray.toArray();
        return highestID[0].ID + 1;
}

module.exports = {
        getDistributions,
        addDistribution,
        getDistrubutionsFromList,
};
