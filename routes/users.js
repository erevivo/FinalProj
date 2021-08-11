var express = require("express");
var router = express.Router();
var {
        currentSessions,
        isManager,
        getUserBySessID,
        setCookies,
} = require("../database/common");
var { addUser, deleteUser, getUserBy, getUsers } = require("../models/users");

router.get("/", async function (req, res, next) {
        let currentUser = await getUserBySessID(req.sessionID);
        console.log(currentUser);
        if (isManager(currentUser) < 2) {
                res.send("You are unauthorized to view this content");
                return;
        }

        //TODO: React page!!
        res.json({
                users: await getUsers(),
        });
});
router.delete("/delete", async function (req, res) {
        let currentUser = await getUserBySessID(req.sessionID);
        if (isManager(currentUser) < 2) {
                res.json({
                        success: false,
                        message: "You are unauthorized to delete users",
                });
                return;
        }
        let userToDelete = await getUserBy("ID", req.body.ID);
        deleteUser(userToDelete);

        res.json({ success: true, message: "User was deleted" });
});

router.post("/newUser", async function (req, res) {
        let body = req.body;
        console.log(body);
        if (await getUserBy("name", body.name)) {
                res.json({
                        success: false,
                        message: "A user with that name exists",
                });
                return;
        }
        let newUser = {
                name: body.name,
                userType: body.type,
                password: body.password,
        };
        addUser(newUser);
        res.json({ success: true, message: "User was created" });
});

router.get("/Type", async function (req, res) {
        currentUser = await getUserBySessID(req.sessionID);
        console.log(currentUser);
        res.json({ isAuth: isManager(currentUser) });
});

router.post("/authenticate", async function (req, res) {
        let body = req.body;
        console.log(await getUsers());
        let user = await getUserBy("name", body.name);
        if (!user)
                res.json({
                        success: false,
                        message: "There is no user with that name",
                });
        

        else if (user.password == body.password) {
                setCookies(res, user);
                let jsonToSend = {
                        success: true,
                        user: user,
                        isAuth: isManager(user),
                };
                currentSessions[req.sessionID] = user.ID;
                res.json(jsonToSend);
        } else {
                res.json({ success: false, message: "Wrong Password" });
        }
});
router.get("/logout", (req, res) => {
        delete currentSessions[req.sessionID];
        setCookies(res, { name: "", userType: "" });
        res.json({ success: true });
});

module.exports = router;
