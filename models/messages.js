var messageDB = require("./mongo")("messages");
var { addMessageToConvo } = require("./convos");

function getMessages(convo) {
        return messageDB.find({ ID: { $in: convo.messages } }).toArray();
}

async function addMessage(convo, message) {
        message.ID = getNewID();
        messageDB.insertOne(message);
        addMessageToConvo(convo, message);
}

async function getNewID() {
        let highestID = await messageDB.find().sort({ ID: -1 }).limit(1);
        return highestID.ID + 1;
}

module.exports = {
        getMessages,
        addMessage,
        getExistingConvos,
};
