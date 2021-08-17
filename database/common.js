const currentSessions = {}; //key - sessionID. val - userID

var { getUserBy } = require("../models/users");

function getCurrentDateTime() {
        return getStringFromDateTime(new Date());
}

function getCurrentDate() {
        let dateobj = new Date();
        return dateobj.getDate().toString().padStart(1, '0') +
                "/" +
                (dateobj.getMonth() + 1).toString().padStart(1, '0') +
                "/" +
                dateobj.getFullYear();
}

function getStringFromDateTime(dateobj) {
        let time = dateobj.getHours() + ":" + dateobj.getMinutes();
        return time + " " + getStringFromDate(dateobj);
}

function getStringFromDate(dateobj) {
        return dateobj.getDate().toString().padStart(1, '0') +
                "/" +
                (dateobj.getMonth() + 1).toString().padStart(1, '0') +
                "/" +
                dateobj.getFullYear();
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

function resetRememberCookies(res) {
        res.cookie("remember", false);
        res.cookie("rEmail", "");
        res.cookie("rPassword", "");
}

function isManager(user) {
        return user.userType == "M";
}

async function getUserBySessID(value) {
        return await getUserBy("ID", currentSessions[value]);
}

function setCookies(res, user) {
        let options = {
                maxAge: 1000 * 60 * 60 * 6, //6 hours
        };
        res.cookie("name", user.name, options);
        res.cookie("userType", user.userType, options);
        res.cookie("id", user.ID, options);
}

module.exports = {
        currentSessions,
        setCookies,
        resetRememberCookies,
        getUserBySessID,
        isManager,
        getCurrentDateTime,
        getCurrentDate,
        getStringFromDate,
        getDateTimeFromString,
        getStringFromDateTime,
        getDateFromString,
};
