var userDB = require("./mongo")("users");

async function addUser(user) {
        console.log(user);
        user.ID = await getNewID();
        console.log(user);
        userDB.insertOne(user);
}

function deleteUser(user) {
        userDB.deleteOne({ ID: user.ID }, function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
        });
}

function getUsers() {
        return userDB.find({}).toArray();
}

function assignDistributer(id) {
        let newVal = { $set: { assigned: true } };
        convoDB.updateOne({ ID: id }, newVal, function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
        });
}

function unassignAll(id) {
        let newVal = { $set: { assigned: false } };
        convoDB.updateMany({ usetType: "D" }, newVal, function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
        });
}

async function getUserBy(key, value) {
        qry = {};
        qry[key] = value;
        //console.log(qry);
        console.log(userDB);
        let returnUser = await userDB.findOne(qry);
        console.log(returnUser);
        return returnUser;
}

function getManagers() {
        return userDB.find({ userType: "M" }).toArray();
}

function getDistributers() {
        return userDB.find({ userType: "D" }).toArray();
}

async function getNewID() {
        let highestID = await userDB.find().sort({ ID: -1 }).limit(1).toArray();
        return highestID[0].ID + 1;
}

async function getUserName(id) {
        let user = await userDB.findOne({ ID: id }, { _id: 0, name: 1 });
        return user.name;
}
module.exports = {
        addUser,
        deleteUser,
        getUserBy,
        assignDistributer,
        unassignAll,
        getUserName,
        getUsers,
        getManagers
};
