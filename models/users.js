var userDB = require('./mongo')("users");


async function addUser(user) {
    console.log(user);
    user.ID = await getNewID();
    console.log(user);
    userDB.insertOne(user);
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

function getManagers(){
    return userDB.find({ userType: { "$eq": "M" } }).toArray();
}

function getDistributers(){
    return userDB.find({ userType: { "$eq": "D" } }).toArray();
}


async function getNewID() {
    let highestArray = userDB.find().project({ _id: 0, ID: 1 }).sort({ ID: -1 }).limit(1);
    let highestID = await highestArray.toArray();
    return highestID[0].ID + 1;
}
module.exports = {
    addUser,
    deleteUser,
    getUserBy,
};