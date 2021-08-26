const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://Abkoen:J0gging9@cluster0.tocw7.mongodb.net/FinalProject?retryWrites=true&w=majority";

function getDB(callback) {
        MongoClient.connect(uri, async function (err, client) {
                if (err) throw err;
                var db = client.db("FinalProject");
                module.exports = (col) => db.collection(col);
                callback();
        });
}
//when server is up, exports will switch to a function that returns the collections.
module.exports = getDB;
