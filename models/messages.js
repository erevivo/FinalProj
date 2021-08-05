var messageDB = require('./mongo')("messages");


function getMessages(mid, did) {
    return branchDB.find({ distID: did, manID: mid }).toArray();
}

async function addMessage(message){
    messageDB.insertOne(message);
}


module.exports = {
    getMessages,
    addMessage,
}