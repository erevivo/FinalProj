var messageDB = require("./mongo")("messages");
var { getCurrentDateTime } = require("../database/common");
var { addMessageToConvo } = require("./convos");

function getMessages(convo) {
        return messageDB.find({ ID: { $in: convo.messages } }).toArray();
}

async function addMessage(convo, message) {
        console.log(convo);
        message.ID = await getNewID();
        message.time = getCurrentDateTime();
        messageDB.insertOne(message);
        addMessageToConvo(convo, message);
}

async function getNewID() {
        try{
                let highestID = await messageDB.find().sort({ ID: -1 }).limit(1).toArray();
                return highestID[0].ID + 1;
        }
        catch{
                return 0;
        }
}

module.exports = {
        getMessages,
        addMessage,
};
