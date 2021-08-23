var express = require("express");
var router = express.Router();
var { currentSessions, getCurrentDateTime } = require("../database/common");
const { getConvos, addConvo, getConvo } = require("../models/convos");
var { addMessage, getMessages } = require("../models/messages");

//TODO: Add Socket.io!!!


router.get("/", async function (req, res) {
        let username = currentSessions[req.sessionID];
        convos = await getConvos(username);
        res.json({ success: true, convos: convos });
});

router.post("/convo", async function (req, res) {
        convo = await getConvo(req.body.mName, req.body.dName);
        res.json({ success: true, convo: convo? await getMessages(convo):[] });
});

router.post("/create", async function (req, res) {
        let newMessage = {
                time: getCurrentDateTime(),
                text: req.body.text,
        };
        let convo;
        if (req.body.isNew) {
                console.log("this is a new conversation");
                convo = {
                        manName: req.body.mName,
                        distName: req.body.dName,
                        messages:[]
                };
                addConvo(convo);
                addMessage(convo, newMessage);
                res.json({ success: true, newConvo: convo });
                return;
        }
        convo = await getConvo(req.body.mName, req.body.dName);
        addMessage(convo, newMessage);
        res.json({ success: true , newMessage: newMessage});
});

module.exports = router;
