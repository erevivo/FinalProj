var express = require('express');
var router = express.Router();
var { branches, writeJson } = require('../database/database');
var cmn = require('../database/common');
/* GET home page. */
router.get("/", function(req, res) {
    let currentUser = cmn.getUserBySessID(req.sessionID);
    console.log(currentUser);
    res.render("branchList", { branches: branches.filter(b => b.active), isAuth: cmn.getAuthLevel(currentUser) >= 2 });
});

router.post("/create", function(req, res) {
    let body = req.body;
    let currentUser = cmn.getUserBySessID(req.sessionID);
    if (cmn.getAuthLevel(currentUser) < 2) {
        res.json({ success: false, message: "You are unauthorized to create Branches" });
        return;
    }
    console.log(body);

    if (branches.some(b => b.name == body.name)) {
        res.json({ success: false, message: "A branch with that name exists" });
        return;
    }
    newBranch = {
        name: body.name,
        ID: branches.reduce((prev, current) => (prev.ID > current.ID) ? prev : current).ID + 1,
        address: body.address,
        active: true
    };
    branches.push(newBranch);
    writeJson('branches', branches);

    res.json({ success: true, message: "Branch was created" });


});


module.exports = router;