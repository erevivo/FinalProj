var express = require("express");
const {
        getCurrentDateTime,
        getDateFromString,
        getStringFromDate,
        currentSessions,
        isManager,
} = require("../database/common");
const { getDistList } = require("../models/distList");
const {
        addMultDisributions,
        getFirstCity,
        getDistributionsByCity,
        getDistributionsByCityByDate,
        getDistributionsFromList,
} = require("../models/distribution");
var router = express.Router();

router.get("/", async function (req, res) {
        let currentUser = currentSessions[req.sessionID];
        let currentDate = getCurrentDateTime();
        if (isManager(currentUser)) {
                let city = getFirstCity();
                let distributions = getDistributionsByCityByDate(
                        city,
                        currentDate
                );
                res.json({
                        success: true,
                        distributions: distributions,
                        city: city,
                        date: currentDate,
                });
        } else {
                let distList = getDistList(currentUser.id, currentDate);
                if (distList) {
                        res.json({
                                success: true,
                                distributions:
                                        getDistributionsFromList(distList),
                        });
                } else {
                        res.json({
                                success: false,
                                message: "No assigned distributions on that date",
                        });
                }
        }
});

router.get("/change", function (req, res) {
        let currentUser = currentSessions[req.sessionID];
        if (isManager(currentUser)) {
                let city = req.body.city;
                let distributions = getDistributionsByCityByDate(
                        city,
                        req.body.date
                );
                res.json({
                        success: true,
                        distributions: distributions,
                        city: city,
                        date: req.body.date,
                });
        } else {
                res.json({
                        success: false,
                        message: "Distributors cannot view other dates or cities",
                });
        }
});

router.post("/create", async function (req, res) {
        let body = req.body;
        let currentUser = getUserBy("ID", currentSessions[req.sessionID]);
        if (!isManager(currentUser)) {
                res.json({
                        success: false,
                        message: "You are unauthorized to create distributions",
                });
                return;
        }
        let newDistributions = [];
        console.log(body);

        if (body.repetitive) {
                let today = new Date();
                let endDay = getDateFromString(body.endDay);
                while (today < endDay) {
                        newDistributions.append({
                                details: body.details,
                                address: body.address,
                                city: body.city,
                                date: getStringFromDate(today),
                        });
                        today.setDate(today.getDate() + body.interval);
                }
        } else {
                newDistributions = [
                        {
                                details: body.details,
                                address: body.address,
                                city: body.city,
                                done: false,
                                date: getCurrentDateTime(),
                        },
                ];
        }
        addMultDisributions(newDistributions);

        res.json({ success: true, message: "Distributions created" });
});

module.exports = router;
