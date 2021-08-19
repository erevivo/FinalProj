var express = require("express");
var router = express.Router();
var { currentSessions, getCurrentDateTime } = require("../database/common");
const { getConvos, addConvo, getConvo } = require("../models/convos");
var { addMessage, getMessages } = require("../models/messages");

//TODO: Add Socket.io!!!

const io = require('socket.io')(server);
io.on('connection', client => {
  client.on('event', data => { /* … */ });
  client.on('disconnect', () => { /* … */ });
});
server.listen(3000);

router.get("/", function (req, res) {
        let uid = currentSessions[req.sessionID];
        convos = getConvos(uid);
        res.json({ success: true, convos: convos });
});

router.get("/convo", async function (req, res) {
        convo = getConvo(req.body.mid, req.body.did);
        res.json({ success: true, convo: await getMessages(await convo) });
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
