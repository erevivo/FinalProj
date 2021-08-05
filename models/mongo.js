const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Abkoen:J0gging9@cluster0.tocw7.mongodb.net/projectflower?retryWrites=true&w=majority";

function getDB(callback) {
    MongoClient.connect(uri, function(err, client) {
        if (err) throw err;
        var db = client.db("projectflower");
        module.exports = col => db.collection(col);
        callback();
    });
}
module.exports = getDB;