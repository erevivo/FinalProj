var distributionDB = require("./mongo")("distributions");

function getDistributions() {
        return distributionbDB.find().toArray();
}

function setDone(distID) {
        let newVal = { $set: { done: true } };
        distributionDB.updateOne({ ID: distID }, newVal, function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
        });
}

function setAssigned(distID, distributerName){
        let newVal = { $set: { assigned: true, assignee:  distributerName} };
        distributionDB.updateOne({ ID: distID }, newVal, function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
        });
}

async function getFirstCity(){
        let firstDist = await distributionDB.findOne({},{_id:0, city:1});
        return firstDist.city;
}

function getDistributionsAssigned(name) {
        return distributionDB.find({ assignee: name }).toArray();
}

function getDistributionsByCityByDate(city, datestr) {
        return distributionDB.find({ city: city, date: datestr, assigned: false }).toArray();
}

function getDistributionsByCity(city) {
        return distributionDB.find({ city: city }).toArray();
}

function getDistributionsByDate(datestr) {
        return distributionDB.find({ date: datestr, assigned: false }).toArray();
}

async function addMultDistributions(distributions) {
        firstID = await getNewID();
        distributions.forEach((dist, index) => {
                dist.ID = firstID + index;
        });
        distributionDB.insertMany(distributions);
}

async function getNewID() {
        let highestID = await distributionDB.find().sort({ ID: -1 }).limit(1).toArray();
        return highestID[0].ID + 1;
}

module.exports = {
        getDistributions,
        addMultDistributions,
        getDistributionsByCity,
        getDistributionsByDate,
        getDistributionsByCityByDate,
        getFirstCity,
        setAssigned,
        getDistributionsAssigned
};
