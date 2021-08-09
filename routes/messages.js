var express = require("express");
var router = express.Router();
var { currentSessions, getCurrentDateTime } = require("../database/common");
const { getConvos, addConvo, getConvo } = require("../models/convos");
var { addMessage } = require("../models/messages");

//TODO: Add Socket.io!!!

router.get("/", function (req, res) {
        let uid = currentSessions[req.sessionID];
        convos = getConvos(uid);
        res.json({ success: true, convos: convo });
});

router.post("/create", async function (req, res) {
        let newMessage = {
                time: getCurrentDateTime(),
                text: req.body.text,
        };
        let convo;
        if (req.body.isNew) {
                convo = {
                        mid: req.body.mid,
                        did: req.body.did,
                };
                addConvo(convo);
                addMessage(covo, newMessage);
                req.json({ success: true, newConvo: convo });
                return;
        }
        convo = getConvo(req.body.mid, req.body.did);
        addMessage(convo, newMessage);
        res.json({ success: true });
});

module.exports = router;
