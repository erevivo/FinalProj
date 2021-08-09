const currentSessions = {}; //key - sessionID. val - userID

var { getUserBy } = require("../models/users");

function getCurrentDateTime() {
        return getStringFromDate(new Date());
}

function getStringFromDate(dateobj) {
        let date =
                dateobj.getDate() +
                "/" +
                (dateobj.getMonth() + 1) +
                "/" +
                dateobj.getFullYear();
        let time = dateobj.getHours() + ":" + dateobj.getMinutes();
        return time + " " + date;
}

function getDateFromString(dateStr) {
        let splitDate = dateStr.split(" ");
        let time = splitDate[0];
        let date = splitDate[1].split("/");
        return Date.parse(`${time} ${date[1]}/${date[0]}/${date[2]}`);
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
}

module.exports = {
        currentSessions,
        setCookies,
        resetRememberCookies,
        getUserBySessID,
        isManager,
        getCurrentDateTime,
        getDateFromString,
        getStringFromDate,
};
