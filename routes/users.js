var express = require("express");
var router = express.Router();
var {
        currentSessions,
        getAuthLevel,
        getUserBySessID,
        setCookies,
} = require("../database/common");
var { addUser, deleteUser, getUserBy } = require("../models/users");

router.get("/", async function (req, res, next) {
        let currentUser = await getUserBySessID(req.sessionID);
        console.log(currentUser);
        if (getAuthLevel(currentUser) < 2) {
                res.send("You are unauthorized to view this content");
                return;
        }

        //TODO: React page!!
        //res.render("userList", { users: await getUsers(), Branches: branchName, withPassword: getAuthLevel(currentUser) >= 2 });
});
router.delete("/delete", async function (req, res) {
        let currentUser = await getUserBySessID(req.sessionID);
        if (getAuthLevel(currentUser) < 2) {
                res.json({
                        success: false,
                        message: "You are unauthorized to delete users",
                });
                return;
        }
        //TODO: get user by id
        //let userToDelete = await getUserBy("email", req.body.email);
        deleteUser(userToDelete);
        //TODO: check if this is needed
        users = users.filter((u) => u.email != req.body.email);

        res.json({ success: true, message: "User was deleted" });
});

router.post("/newUser", async function (req, res) {
        let body = req.body;
        console.log(body);
        let existing = await getUserBy("fname", body.ID);
        if (existing && existing.lname == body.lname) {
                res.json({
                        success: false,
                        message: "A user with that name exists",
                });
                return;
        }
        let newUser = {
                fname: body.fname,
                lname: body.lname,
                userType: body.type,
                password: body.password,
        };
        addUser(newUser);
        res.json({ success: true, message: "User was created" });
});

router.get("/Type", async function (req, res) {
        currentUser = await getUserBySessID(req.sessionID);
        console.log(currentUser);
        res.json({ isAuth: getAuthLevel(currentUser) >= 2 });
});

router.post("/authenticate", async function (req, res) {
        if (!(req.sessionID in passwordattempts))
                passwordattempts[req.sessionID] = {};
        let body = req.body;
        if (!validateEmail(body.email)) {
                res.json({ success: false, message: "Email is invalid" });
                return;
        }
        let user = await getUserBy("email", body.email);
        if (!user)
                res.json({
                        success: false,
                        message: "There is no user with that Email Address",
                });

        if (
                req.sessionID in lockedSessions &&
                user.ID in lockedSessions[req.sessionID]
        ) {
                console.log(lockedSessions[req.sessionID]);
                let difference =
                        Date.now() - lockedSessions[req.sessionID][user.ID];
                difference = difference / (1000 * 3600);
                console.log(difference);
                if (difference < 6) {
                        res.json({
                                success: false,
                                message: "This user has been locked out of this session",
                        });
                        return;
                } else {
                        delete lockedSessions[req.sessionID][user.ID];
                        delete passwordattempts[req.sessionID][user.ID];
                }
        }
        if (user.password == body.password) {
                setCookies(res, user);
                if (body.remember) setRememberCookies(res, user);
                else resetRememberCookies(res);
                let currentCart = await getCartByID(user.ID);
                if (!currentCart) {
                        createCart(user.ID);
                        currentCart = { items: [] };
                }
                let jsonToSend = {
                        success: true,
                        user: user,
                        isAuth: getAuthLevel(user) >= 1,
                        cart: currentCart.items,
                };
                currentSessions[req.sessionID] = user.ID;
                res.json(jsonToSend);
        } else {
                if (!(user.ID in passwordattempts[req.sessionID]))
                        passwordattempts[req.sessionID][user.ID] = 1;
                else passwordattempts[req.sessionID][user.ID]++;

                if (passwordattempts[req.sessionID][user.ID] >= 5) {
                        if (!(req.sessionID in lockedSessions))
                                lockedSessions[req.sessionID] = {};
                        lockedSessions[req.sessionID][user.ID] = Date.now();

                        res.json({ success: false, message: "Wrong Password" });
                }
        }
});
router.get("/logout", (req, res) => {
        delete currentSessions[req.sessionID];
        setCookies(res, { fname: "", lname: "", email: "" });
        res.json({ success: true });
});

module.exports = router;
