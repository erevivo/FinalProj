var userDB = require("./mongo")("users");

async function addUser(user) {
        userDB.insertOne(user);
}

function deleteUser(user) {
        userDB.deleteOne({ name: user.name }, function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
        });
}

function getUsers() {
        return userDB.find({}).toArray();
}

function assignDistributer(name) {
        let newVal = { $set: { assigned: true } };
        convoDB.updateOne({ name: name }, newVal, function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
        });
}

function unassignAll() {
        let newVal = { $set: { isAssigned: false } };
        convoDB.updateMany({ usetType: "D" }, newVal, function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
        });
}

async function getUserBy(key, value) {
        qry = {};
        qry[key] = value;
        let returnUser = await userDB.findOne(qry);
        return returnUser;
}

function getManagers() {
        return userDB.find({ userType: "M" }).toArray();
}

function getAvailableDists() {
        return userDB.find({ userType: "D", isAssigned: false }).toArray();
}

module.exports = {
        addUser,
        deleteUser,
        getUserBy,
        assignDistributer,
        unassignAll,
        getUsers,
        getManagers,
        getAvailableDists
};
