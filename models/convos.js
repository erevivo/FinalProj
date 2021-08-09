var convoDB = require("./mongo")("convos");

async function addConvo(convo) {
        convoDB.insertOne(convo);
}

async function addMessageToConvo(convo, message) {
        convo.messages.push(message.ID);
        let convoToUpdate = { mid: convo.mid, did: convo.did };
        let newList = { $set: { messages: convo.messages } };
        convoDB.updateOne(convoToUpdate, newList, function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
        });
}

async function getConvo(mid, did) {
        return convoDB.findOne({ mid: mid, did: did });
}

function getConvos(id) {
        return convoDB
                .find({
                        $or: [{ mid: id }, { did: id }],
                })
                .toArray();
}

module.exports = { getConvo, getConvos, addConvo, addMessageToConvo };
