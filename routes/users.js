var express = require('express');
var router = express.Router();
var { users, writeJson } = require("../database/database");
var cmn = require('../database/common');
var { currentSessions, lockedSessions, currentSessions } = cmn;

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.delete("/delete", function(req, res) {
    let currentUser = cmn.getUserBySessID(req.sessionID);
    if (cmn.getAuthLevel(currentUser) < 2) {
        res.json({ success: false, message: "You are unauthorized to delete users" });
        return;
    }
    users = users.filter(u => u.email != req.body.email);
    db.writeJson('users', users);

    res.json({ success: true, message: "User was deleted" });


});

router.post("/promote", function(req, res) {
    let currentUser = cmn.getUserBySessID(req.sessionID);
    console.log(currentUser);
    if (cmn.getAuthLevel(currentUser) < 2) {
        res.json({ success: false, message: "You are unauthorized to promote employees" });
        return;
    }
    userToPromote = users.findIndex(u => u.email == req.body.email);
    users[userToPromote].userType = "manager";

    writeJson('users', users);

    res.json({ success: true, message: "User was promoted" });


});

router.post("/demote", function(req, res) {
    let currentUser = cmn.getUserBySessID(req.sessionID);
    console.log(currentUser);
    if (cmn.getAuthLevel(currentUser) < 2) {
        res.json({ success: false, message: "You are unauthorized to demote employees" });
        return;
    }
    userToDemote = users.findIndex(u => u.email == req.body.email);
    users[userToPromote].userType = "employee";
    writeJson('users', users);

    res.json({ success: true, message: "User was demoted" });


});

router.post("/createCustomer", function(req, res) {
    let body = req.body;
    console.log(body);
    if (!cmn.validateEmail(body.email)) {
        res.json({ success: false, message: "Email is invalid" });
        return;

    }
    if (users.some(u => u.email == body.email)) {
        res.json({ success: false, message: "A user with that email exists" });
        return;
    }
    newUser = {
        fname: body.fname,
        lname: body.lname,
        email: body.email,
        userType: "customer",
        "password": body.password,
        "Branch": null,
        ID: users.reduce((prev, current) => (prev.ID > current.ID) ? prev : current).ID + 1
    };
    cmn.addUser(newUser);
    res.json({ success: true, message: "User was created" });



});

router.post("/createEmployee", function(req, res) {
    let body = req.body;
    let currentUser = cmn.getUserBySessID(req.sessionID);
    if (cmn.getAuthLevel(currentUser) < 2) {
        res.json({ success: false, message: "You are unauthorized to create Employees" });
        return;
    }
    console.log(body);
    if (!cmn.validateEmail(body.email)) {
        res.json({ success: false, message: "Email is invalid" });
        return;

    }
    if (users.some(u => u.email == body.email)) {
        res.json({ success: false, message: "A user with that email exists" });
        return;
    }
    if (!branches.some(b => b.ID == body.branch)) {
        res.json({ success: false, message: "That branch ID does not exist" });
        return;
    }
    newUser = {
        fname: body.fname,
        lname: body.lname,
        email: body.email,
        salary: body.salary,
        userType: "employee",
        password: body.password,
        Branch: body.branch,
        ID: users.reduce((prev, current) => (prev.ID > current.ID) ? prev : current).ID + 1
    };
    cmn.addUser(newUser);
    res.json({ success: true, message: "User was created" });



});

router.get("/Type", (req, res) => {
    currentUser = cmn.getUserBySessID(req.sessionID);
    console.log(currentUser);
    res.json({ isAuth: cmn.getAuthLevel(currentUser) >= 1, cart: carts[currentSessions[req.sessionID]] });
});

router.post("/authenticate", function(req, res) {
    if (!(req.sessionID in passwordattempts))
        passwordattempts[req.sessionID] = {};
    let body = req.body;
    if (!cmn.validateEmail(body.email)) {
        res.json({ success: false, message: "Email is invalid" });
        return;
    }
    let user = users.filter((u) => u.email == body.email);
    if (user.length == 0)
        res.json({ success: false, message: "There is no user with that Email Address" });
    if (user.length > 1) {
        console.error("There are too many users with that Email Address");
        res.json({ success: false, message: "Server Error!" });
        return;
    }
    user = user[0];
    if (req.sessionID in lockedSessions && user.ID in lockedSessions[req.sessionID]) {
        console.log(lockedSessions[req.sessionID]);
        let difference = (Date.now() - lockedSessions[req.sessionID][user.ID]);
        difference = difference / (1000 * 3600);
        console.log(difference);
        if (difference < 6) {
            res.json({ success: false, message: "This user has been locked out of this session" });
            return;
        } else {
            delete lockedSessions[req.sessionID][user.ID];
            delete passwordattempts[req.sessionID][user.ID];
        }
    }
    if (user.password == body.password) {
        setCookies(res, user);
        if (body.remember)
            cmn.setRememberCookies(res, user);
        else
            cmn.resetRememberCookies(res);
        if (!(user.ID in carts))
            carts[user.ID] = [];

        let jsonToSend = {
            success: true,
            user: user,
            isAuth: cmn.getAuthLevel(user) >= 1,
            cart: carts[user.ID]
        }
        currentSessions[req.sessionID] = user.ID;
        res.json(jsonToSend);

    } else {
        if (!(user.ID in passwordattempts[req.sessionID]))
            passwordattempts[req.sessionID][user.ID] = 1;
        else
            passwordattempts[req.sessionID][user.ID]++;

        if (passwordattempts[req.sessionID][user.ID] >= 5) {
            if (!(req.sessionID in lockedSessions))
                lockedSessions[req.sessionID] = {};
            lockedSessions[req.sessionID][user.ID] = Date.now()

            res.json({ success: false, message: "Wrong Password" });
        }

    }
});
router.get("/logout", (req, res) => {
    delete currentSessions[req.sessionID];

    cmn.setCookies(res, { fname: '', lname: '', email: '' });
    res.json({ success: true });

});
router.get("/logout", (req, res) => {
    delete currentSessions[req.sessionID];
    cmn.setCookies(res, { fname: '', lname: '', email: '' });
    res.json({ success: true });
});



module.exports = router;