var express = require("express");
const NodeGeocoder = require('node-geocoder');

const options = {
        provider: 'openmapquest',
        apiKey: 'bpJv6Pv9c0J9TourCzB24vlzBSta7kgY', // for Mapquest, OpenCage, Google Premier
};
const geocoder = NodeGeocoder(options);
const kmeans = require("node-kmeans")
const {
        getCurrentDateTime,
        getCurrentDate,
        getDateTimeFromString,
        getStringFromDateTime,
        currentSessions, getStringFromDate,
        isManager, getDateFromString,
} = require("../database/common");
const { getUserBySessID } = require("../database/common")
const {
        addMultDistributions,
        getFirstCity,
        getDistributionsByCity,
        getDistributionsByCityByDate,
        setAssigned,
        getDistributionsByDate,
        getDistributionsAssigned,
} = require("../models/distribution");
const { getAvailableDists, assignDistributer } = require("../models/users");
var router = express.Router();

router.get("/", async function (req, res) {
        let currentUser = await getUserBySessID(req.sessionID);
        let currentDate = getCurrentDate();
        console.log(currentDate);
        if (isManager(currentUser)) {
                let city = await getFirstCity();
                let distributions = await getDistributionsByDate(currentDate);
                groupedDists = {};
                distributions.forEach(d => {
                        if (d.city in groupedDists)
                                groupedDists[d.city].push(d);
                        else
                                groupedDists[d.city] = [d];
                });
                res.json({
                        success: true,
                        grouped: groupedDists,
                        city: city,
                        date: currentDate,
                        distributers: await getAvailableDists()
                });
        } else {
                res.json({
                        success: true,
                        distributions: await getDistributionsAssigned(distList),
                });

        }
});

router.post("/change", async function (req, res) {
        let currentUser = await getUserBySessID(req.sessionID);
        if (isManager(currentUser)) {
                let city = req.body.city;
                let distributions = await getDistributionsByDate(req.body.date);
                groupedDists = {};
                distributions.forEach(d => {
                        if (d.city in groupedDists)
                                groupedDists[d.city].push(d);
                        else
                                groupedDists[d.city] = [d];
                });
                res.json({
                        success: true,
                        grouped: groupedDists,
                        city: city,
                        date: req.body.date,
                });
        } else {
                res.json({
                        success: false,
                        message: "Distributors cannot view other dates",
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
        let distributions = await getDistributionsByCityByDate(req.body.city, getCurrentDate());

        let locations = distributions.map(d => geocoder.geocode(`${d.address} ${d.city}`));
        let vectors = new Array(locations.length);
        for (let i = 0; i < locations.length; i++) {
                let loc = await locations[i];
                locations[i] = { loc: loc[0], ID: distributions[i].ID };
                vectors[i] = [loc[0].longitude, loc[0].latitude];
        }

        let distributers = req.body.distributers;
        kmeans.clusterize(vectors, { k: distributers.length }, (err, result) => {
                for (let i = 0; i < distributers.length; i++) {
                        for (let j = 0; j < result[i].cluster.length; j++) {
                                setAssigned(distributions[result[i].clusterInd[j]].ID, distributers[i].name);
                                assignDistributer(distributers[i].name);
                        }
                }
        });

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
                                done: false,
                                assigned: false,
                                assignee: ""
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
                                assigned: false,
                                assignee: ""
                        },
                ];
        }
        addMultDistributions(newDistributions);

        res.json({ success: true, message: "Distributions created" });
});

module.exports = router;
