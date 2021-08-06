var express = require("express");
var router = express.Router();
var {
        currentSessions,
        getCurrentDateTime,
        getDetailedFlowerList,
        getUserBySessID,
        getDateFromString,
        getAuthLevel,
} = require("../database/common");
var { getMessages, addMessage } = require("../models/messages");
var { getUserBy } = require("../models/users");

//TODO: Add Socket.io!!!

router.post("/create", async function (req, res) {
        let newMessage = {
                from: currentSessions[req.sessionID],
                distID: req.body.dist,
                manID: req.body.man,
                time: getCurrentDateTime(),
        };
        addMessage(newMessage);
        res.json({ success: true });
});

router.get("/messages", async function (req, res) {});

module.exports = router;
