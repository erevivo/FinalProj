var distributionDB = require("./mongo")("distributions");

function getDistributions() {
        return distributionbDB.find().toArray();
}

function setDone(distID) {
        let newVal = { $set: { done: true } };
        convoDB.updateOne({ ID: distID }, newVal, function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
        });
}

function getFirstCity(){
        return distributionDB.findOne({},{_id:0, city:1}).city;
}

function getDistributionsFromList(distList) {
        return distributionDB.find({ ID: { $in: distList.list } }).toArray();
}

function getDistributionsByCityByDate(city, datestr) {
        return distributionDB.find({ city: city, date: datestr }).toArray();
}

function getDistributionsByCity(city) {
        return distributionDB.find({ city: city }).toArray();
}

function getDistributionsByDate(datestr) {
        return distributionDB.find({ date: datestr }).toArray();
}

async function addMultDisributions(distributions) {
        firstID = await getNewID();
        distributions.foreach((dist, index) => {
                dist.ID = firstID + index;
        });
        distributionbDB.insertMany(distributions);
}

async function getNewID() {
        let highestID = await distributionDB.find().sort({ ID: -1 }).limit(1);
        return highestID.ID + 1;
}

module.exports = {
        getDistributions,
        addMultDisributions,
        getDistributionsFromList,
        getDistributionsByCity,
        getDistributionsByDate,
        getDistributionsByCityByDate,
        getFirstCity
};
