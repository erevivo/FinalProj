var fs = require('fs');
var users = require("../jsons/users");
const flowers = require("../jsons/flowers");
var branches = require("../jsons/branches");
var carts = require("../jsons/carts");
var orders = require("../jsons/orders");

function writeJson(file, obj) {
    fs.writeFile('./jsons/' + file + '.json', JSON.stringify(obj, null, 4), function(err) {
        console.log(err);
    });

}

module.exports = {
    users: users,
    flowers: flowers,
    branches: branches,
    carts: carts,
    orders: orders,
    writeJson: writeJson
}