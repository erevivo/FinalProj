var branchDB = require('./mongo')("branches");
var branchName = {};

function initializeName() {
    let allBranches = branchDB.find().project({ _id: 0, ID: 1, name: 1 });
    allBranches.forEach(b => {
        branchName[b.ID] = b.name;
    });
}

function getActiveBranches() {
    return branchDB.find({ active: true }).toArray();
}


function getBranchByName(name) {
    return branchDB.findOne({ name: name });
}

async function getBranchByID(id) {
    return branchDB.findOne({ ID: id });
}

async function getNewID() {
    let highestID = await branchDB.find().sort({ ID: -1 }).limit(1);
    return highestID.ID + 1;
}



async function addBranch(branch) {
    branch.ID = await getNewID();
    branchDB.insertOne(branch);
}
initializeName();
module.exports = {
    getActiveBranches,
    getBranchByName,
    getBranchByID,
    addBranch,
    branchName
}