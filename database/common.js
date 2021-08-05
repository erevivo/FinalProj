const currentSessions = {}; //key - sessionID. val - userID

var { getUserBy } = require('../models/users')


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

function getAuthLevel(user) {
    const authLevels = {
        "M": 2,
        "D": 1,
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

module.exports = {
    currentSessions,
    setCookies,
    resetRememberCookies,
    getUserBySessID,
    getAuthLevel,
    getCurrentDateTime,
    getDateFromString
}