var convoDB = require("./mongo")("convos");

async function addConvo(convo) {
        convoDB.insertOne(convo);
}

async function addMessageToConvo(convo, message) {
        convo.messages.push(message.ID);
        let convoToUpdate = { manName: convo.manName, distName: convo.distName };
        let newList = { $set: { messages: convo.messages } };
        convoDB.updateOne(convoToUpdate, newList, function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
        });
}

async function getConvo(mname, dname) {
        return convoDB.findOne({ manName: mname, distName: dname });
}

function getConvos(name) {
        return convoDB
                .find({
                        $or: [{ manName: name }, { distName: name }],
                })
                .toArray();
}

module.exports = { getConvo, getConvos, addConvo, addMessageToConvo };
