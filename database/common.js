var { writeJson, branches, flowers, users } = require('./database');

const currentSessions = {}; //key - sessionID. val - userID
const lockedSessions = {}; //key - sessionID. val - object(key - userID. val - lock time)
const passwordattempts = {}; //key - sessionID. val - object(key - userID. val - attempts)

var { getFlowerByID } = require('../models/flowers');
var { getUserBy } = require('../models/users')

function getDetailedFlowerList(items, flowers) {
    console.log(items, flowers)
    return items.map(item => {
        let flower = flowers.find(flower => flower.ID == item.id);
        return {
            quantity: item.quantity,
            color: item.color,
            name: flower.name,
            img: flower.img,
            price: flower.price,
            id: item.id
        };
    })

}

function getCurrentDateTime() {
    let today = new Date();
    let date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes();
    return time + ' ' + date;
}

function getDateFromString(dateStr) {
    let splitDate = dateStr.split(' ');
    let time = splitDate[0];
    let date = splitDate[1].split('/');
    return Date.parse(`${time} ${date[1]}/${date[0]}/${date[2]}`);
}



function resetRememberCookies(res) {
    res.cookie("remember", false);
    res.cookie("rEmail", '');
    res.cookie("rPassword", '');
}

function validateEmail(email) {
    const re = /[\w.]{1,20}@\w{1,20}(\.\w{2,3}){1,2}/g;
    return re.test(email);
}

function getAuthLevel(user) {
    const authLevels = {
        "Developer": 2,
        "manager": 2,
        "employee": 1,
        "customer": 0
    };
    return user ? authLevels[user.userType] : 0;
}



async function getUserBySessID(value) {
    return await getUserBy("ID", currentSessions[value]);
}





function setCookies(res, user) {
    let options = {
        maxAge: 1000 * 60 * 60 * 6, //6 hours
    }
    res.cookie("fname", user.fname, options);
    res.cookie("lname", user.lname, options);
    res.cookie("email", user.email, options);
    res.cookie("userType", user.userType, options);
}

function setRememberCookies(res, user) {
    res.cookie("remember", true);
    res.cookie("rEmail", user.email);
    res.cookie("rPassword", user.password);
}

module.exports = {
    lockedSessions,
    passwordattempts,
    currentSessions,
    getDetailedFlowerList,
    setRememberCookies,
    setCookies,
    resetRememberCookies,
    getUserBySessID,
    getAuthLevel,
    getCurrentDateTime,
    validateEmail,
    getDateFromString
}