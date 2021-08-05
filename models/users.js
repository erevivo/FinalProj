var userDB = require('./mongo')("users");


async function addUser(user) {
    console.log(user);
    user.ID = await getNewID();
    console.log(user);
    userDB.insertOne(user);
}

function promoteUser(userID) {
    let userToPromote = { ID: userID };
    let newvalues = { $set: { userType: "manager" } };
    userDB.updateOne(userToPromote, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });
}

function demoteUser(userID) {
    let userToDemote = { ID: userID };
    let newvalues = { $set: { userType: "employee" } };
    userDB.updateOne(userToDemote, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });
}

function deleteUser(user) {
    userDB.deleteOne({ ID: user.ID },
        function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
        });
}

function getUserBy(key, value) {
    qry = {}
    qry[key] = value;
    let returnUser = userDB.findOne(qry);
    return returnUser;
}

function getUsers() {
    return userDB.find({ userType: { "$ne": "Developer" } }).toArray();
}

async function getNewID() {
    let highestArray = userDB.find().project({ _id: 0, ID: 1 }).sort({ ID: -1 }).limit(1);
    let highestID = await highestArray.toArray();
    return highestID[0].ID + 1;
}
module.exports = {
    addUser,
    deleteUser,
    promoteUser,
    demoteUser,
    getUserBy,
    getUsers
};