var express = require("express");
const NodeGeocoder = require('node-geocoder');
 
const options = {
  provider: 'here',
  apiKey: 'fJdF-AHUwciourV5CmyISbTHrojNZufpiYQHFxwy_wc', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};
const geocoder = NodeGeocoder(options);

const {
        getCurrentDateTime,
        getCurrentDate,
        getDateTimeFromString,
        getStringFromDateTime,
        currentSessions, getStringFromDate,
        isManager, getDateFromString,
} = require("../database/common");
const { getUserBySessID } = require("../database/common")
const { getDistList } = require("../models/distList");
const {
        addMultDistributions,
        getFirstCity,
        getDistributionsByCity,
        getDistributionsByCityByDate,
        getDistributionsFromList,
} = require("../models/distribution");
const { getAvailableDists } = require("../models/users");
const { default: Distributions } = require("../views/src/components/Distributions");
var router = express.Router();

router.get("/", async function (req, res) {
        let currentUser = await getUserBySessID(req.sessionID);
        let currentDate = getCurrentDate();
        console.log(currentDate);
        if (isManager(currentUser)) {
                let city = await getFirstCity();
                let distributions = await getDistributionsByCityByDate(
                        city,
                        currentDate
                );
                res.json({
                        success: true,
                        distributions: distributions,
                        city: city,
                        date: currentDate,
                        distributers: await getAvailableDists()
                });
        } else {
                let distList = await getDistList(currentUser.name, currentDate);
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

router.post("/change", async function (req, res) {
        let currentUser = await getUserBySessID(req.sessionID);
        if (isManager(currentUser)) {
                let city = req.body.city;
                let distributions = await getDistributionsByCityByDate(
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

router.post("/assign", async function (req, res) {
        let currentUser = await getUserBySessID(req.sessionID);
        if (!isManager(currentUser)) {
                res.json({
                        success: false,
                        message: "You are unauthorized to assign distributions",
                });
                return;
        }

        let distributions = await getDistributionsByCityByDate(body.city, getCurrentDate());
        locations = []
        distributions.forEach(async d=>{
                let loc = await geocoder.geocode(`${d.address} ${d.city}`);
                locations.push({
                        lat: loc[0].latitude,
                        long: loc[0].longitude,
                        ID: d.ID
                })
        })
        console.log(locations);
        res.json({ success: true, message: "Fuck You" });
});

router.post("/create", async function (req, res) {
        let body = req.body;
        let currentUser = await getUserBySessID(req.sessionID);
        if (!isManager(currentUser)) {
                res.json({
                        success: false,
                        message: "You are unauthorized to create distributions",
                });
                return;
        }
        let newDistributions = [];
        let interval = parseInt(body.interval);
        if (body.repetitive) {
                let today = getDateFromString(body.date);
                let endDay = getDateFromString(body.endDay);
                while (today < endDay) {
                        newDistributions.push({
                                details: body.details,
                                address: body.address,
                                city: body.city,
                                date: getStringFromDate(today),
                        });
                        today.setDate(today.getDate() + interval);
                }
        } else {
                newDistributions = [
                        {
                                details: body.details,
                                address: body.address,
                                city: body.city,
                                done: false,
                                date: body.date,
                        },
                ];
        }
        addMultDistributions(newDistributions);

        res.json({ success: true, message: "Distributions created" });
});

module.exports = router;
