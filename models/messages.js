var messageDB = require("./mongo")("messages");
var { getCurrentDateTime } = require("../database/common");
var { addMessageToConvo } = require("./convos");

function getMessages(convo) {
        return messageDB.find({ ID: { $in: convo.messages } }).toArray();
}

async function addMessage(convo, message) {
        message.ID = getNewID();
        message.time = getCurrentDateTime();
        messageDB.insertOne(message);
        addMessageToConvo(convo, message);
}

async function getNewID() {
        let highestID = await messageDB.find().sort({ ID: -1 }).limit(1).toArray();
        return highestID[0].ID + 1;
}

module.exports = {
        getMessages,
        addMessage,
};
