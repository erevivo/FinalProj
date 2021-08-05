var express = require('express');
var router = express.Router();
var { branches, writeJson } = require('../database/database');
var { currentSessions, getAuthLevel } = require('../database/common');
var { getActiveBranches, getBranchByName, addBranch, getBranchByID } = require('../models/branches');
var { getUserBy } = require('../models/users');

router.get("/", async function(req, res) {
    let currentUser = await getUserBy("ID", currentSessions[req.sessionID]);
    console.log(currentUser);
    res.render("branchList", { branches: await getActiveBranches(), isAuth: getAuthLevel(currentUser) >= 2 });
});

router.post("/create", async function(req, res) {
    let body = req.body;
    let currentUser = getUserBy("ID", currentSessions[req.sessionID]);
    if (getAuthLevel(currentUser) < 2) {
        res.json({ success: false, message: "You are unauthorized to create Branches" });
        return;
    }
    console.log(body);

    if (await getBranchByName(body.name)) {
        res.json({ success: false, message: "A branch with that name exists" });
        return;
    }
    newBranch = {
        name: body.name,
        address: body.address,
        active: true
    };
    branches.push(newBranch);
    writeJson('branches', branches);
    addBranch(newBranch);

    res.json({ success: true, message: "Branch was created" });


});


module.exports = router;