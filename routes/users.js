var express = require('express');
var router = express.Router();
var { users, writeJson, carts } = require("../database/database");
var {
    currentSessions,
    lockedSessions,
    passwordattempts,
    getAuthLevel,
    validateEmail,
    getUserBySessID,
    setCookies,
    setRememberCookies,
    resetRememberCookies
} = require('../database/common');
var {
    addUser,
    deleteUser,
    promoteUser,
    demoteUser,
    getUserBy,
    getUsers,
} = require('../models/users');
var { getCartByID, createCart } = require('../models/cart');
var { getActiveBranches, getBranchByName, addBranch, branchName, getBranchByID } = require('../models/branches');

//TODO: remove all legacy db
router.get('/', async function(req, res, next) {
    let currentUser = await getUserBySessID(req.sessionID);
    console.log(currentUser);
    if (getAuthLevel(currentUser) < 1) {
        res.send("You are unauthorized to view this content")
        return;
    }

    res.render("userList", { users: await getUsers(), Branches: branchName, withPassword: getAuthLevel(currentUser) >= 2 });
});
router.delete("/delete", async function(req, res) {
    let currentUser = await getUserBySessID(req.sessionID);
    if (getAuthLevel(currentUser) < 2) {
        res.json({ success: false, message: "You are unauthorized to delete users" });
        return;
    }
    let userToDelete = await getUserBy("email", req.body.email);
    deleteUser(userToDelete);
    users = users.filter(u => u.email != req.body.email);

    res.json({ success: true, message: "User was deleted" });


});

router.post("/promote", async function(req, res) {
    let currentUser = await getUserBySessID(req.sessionID);
    console.log(currentUser);
    if (getAuthLevel(currentUser) < 2) {
        res.json({ success: false, message: "You are unauthorized to promote employees" });
        return;
    }
    let userToPromote = await getUserBy("email", req.body.email);
    userToPromote.userType = "manager";
    promoteUser(userToPromote.ID);
    writeJson('users', users);

    res.json({ success: true, message: "User was promoted" });


});

router.post("/demote", async function(req, res) {
    let currentUser = await getUserBySessID(req.sessionID);
    console.log(currentUser);
    if (getAuthLevel(currentUser) < 2) {
        res.json({ success: false, message: "You are unauthorized to demote employees" });
        return;
    }
    let userToDemote = await getUserBy("email", req.body.email);
    userToDemote.userType = "employee";
    writeJson('users', users);
    demoteUser(userToDemote.ID);
    res.json({ success: true, message: "User was demoted" });


});

router.post("/createCustomer", async function(req, res) {
    let body = req.body;
    console.log(body);
    if (!validateEmail(body.email)) {
        res.json({ success: false, message: "Email is invalid" });
        return;

    }
    if (await getUserBy("email", body.email)) {
        res.json({ success: false, message: "A user with that email exists" });
        return;
    }
    newUser = {
        fname: body.fname,
        lname: body.lname,
        email: body.email,
        userType: "customer",
        password: body.password,
        Branch: null,
    };
    addUser(newUser);
    res.json({ success: true, message: "User was created" });



});

router.post("/createEmployee", async function(req, res) {
    let body = req.body;
    let currentUser = await getUserBySessID(req.sessionID);
    if (getAuthLevel(currentUser) < 2) {
        res.json({ success: false, message: "You are unauthorized to create Employees" });
        return;
    }
    console.log(body);
    if (!validateEmail(body.email)) {
        res.json({ success: false, message: "Email is invalid" });
        return;

    }
    if (await getUserBy("email", body.email)) {
        res.json({ success: false, message: "A user with that email exists" });
        return;
    }
    if (!getBranchByID(body.branch)) {
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
    };
    addUser(newUser);
    res.json({ success: true, message: "User was created" });



});

router.get("/Type", async function(req, res) {
    currentUser = await getUserBySessID(req.sessionID);
    console.log(currentUser);
    res.json({ isAuth: getAuthLevel(currentUser) >= 1, cart: await getCartByID(currentSessions[req.sessionID]) });
});



router.post("/authenticate", async function(req, res) {
    if (!(req.sessionID in passwordattempts))
        passwordattempts[req.sessionID] = {};
    let body = req.body;
    if (!validateEmail(body.email)) {
        res.json({ success: false, message: "Email is invalid" });
        return;
    }
    let user = await getUserBy("email", body.email);
    if (!user)
        res.json({ success: false, message: "There is no user with that Email Address" });


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
            setRememberCookies(res, user);
        else
            resetRememberCookies(res);
        let currentCart = await getCartByID(user.ID);
        if (!currentCart) {
            createCart(user.ID);
            currentCart = { items: [] }
        }
        let jsonToSend = {
            success: true,
            user: user,
            isAuth: getAuthLevel(user) >= 1,
            cart: currentCart.items
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
    setCookies(res, { fname: '', lname: '', email: '' });
    res.json({ success: true });
});




module.exports = router;