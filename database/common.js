const currentSessions = {}; //key - sessionID. val - userID

var { getUserBy } = require("../models/users");

function getCurrentDateTime() {
        return getStringFromDateTime(new Date());
}

function getCurrentDate() {
        return getStringFromDate(new Date());
}

function getStringFromDateTime(dateobj) {
        return getStringFromTime(dateobj) + " " + getStringFromDate(dateobj);
}

function getStringFromDate(dateobj) {
        return dateobj.getDate().toString().padStart(2, '0') +
                "/" +
                (dateobj.getMonth() + 1).toString().padStart(2, '0') +
                "/" +
                dateobj.getFullYear();
}

function getStringFromTime(dateobj) {
        return dateobj.getHours().toString().padStart(2, '0') + ":" +
                dateobj.getMinutes().toString().padStart(2, '0');
}

function getDateTimeFromString(dateStr) {
        let splitDate = dateStr.split(" ");
        let time = splitDate[0];
        let date = splitDate[1].split("/");
        return Date.parse(`${time} ${date[1]}/${date[0]}/${date[2]}`);
}

function getDateFromString(dateStr) {
        let splitDate = dateStr.split("/");
        return new Date(`${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`);
}


function isManager(user) {
        return user.userType == "M";
}

async function getUserBySessID(value) {
        return await getUserBy("name", currentSessions[value]);
}

function setCookies(res, user) {
        let options = {
                maxAge: 1000 * 60 * 60 * 6, //6 hours
        };
        res.cookie("name", user.name, options);
        res.cookie("userType", user.userType, options);
}

module.exports = {
        currentSessions,
        setCookies,
        getUserBySessID,
        isManager,
        getCurrentDateTime,
        getCurrentDate,
        getStringFromDate,
        getDateTimeFromString,
        getStringFromDateTime,
        getDateFromString,
};
