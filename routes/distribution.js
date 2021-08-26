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
        getDistributionsByCityByDate,
        setAssigned,
        getDistributionsByDate,
        getDistributionsAssigned,
        doneDistribution
} = require("../models/distribution");
const { getAvailableDists, assignDistributer } = require("../models/users");
var router = express.Router();

router.get("/", async function (req, res) {
        let currentUser = await getUserBySessID(req.sessionID);
        let currentDate = getCurrentDate();
        console.log(currentDate);
        if (isManager(currentUser)) {
                let distributions = await getDistributionsByDate(currentDate);
                groupedDists = {};
                distributions.forEach(d => {
                        if (d.city in groupedDists)
                                groupedDists[d.city].push(d);
                        else
                                groupedDists[d.city] = [d];
                });
                console.log(distributions);
                res.json({
                        success: true,
                        grouped: groupedDists,
                        date: currentDate,
                        distributers: await getAvailableDists()
                });
        } else {
                let distributions = await getDistributionsAssigned(currentUser.name, currentDate);
                grouped = {};
                grouped[distributions[0].city] = distributions;
                res.json({
                        success: true,
                        grouped: grouped,
                });

        }
});

router.post("/change", async function (req, res) {
        let currentUser = await getUserBySessID(req.sessionID);
        if (isManager(currentUser)) {
                let distributions = await getDistributionsByDate(req.body.date);
                groupedDists = {};
                distributions.forEach(d => {
                        if (d.city in groupedDists)
                                groupedDists[d.city].push(d);
                        else
                                groupedDists[d.city] = [d];
                });
                console.log(distributions)
                res.json({
                        success: true,
                        grouped: groupedDists,
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
        if (distributions.length == 0){
                res.json({ success: false, message: "No distributions to assign" });
                return;
        }
        let locations = distributions.map(d => geocoder.geocode(`${d.address} ${d.city}`));
        let vectors = new Array(locations.length);
        for (let i = 0; i < locations.length; i++) {
                let loc = await locations[i];
                locations[i] = { loc: loc[0], ID: distributions[i].ID };
                vectors[i] = [loc[0].longitude, loc[0].latitude];
        }

        let distributers = req.body.distributers.slice(0, distributions.length);
        kmeans.clusterize(vectors, { k: distributers.length }, (err, result) => {
                for (let i = 0; i < distributers.length; i++) {
                        for (let j = 0; j < result[i].cluster.length; j++) {
                                setAssigned(distributions[result[i].clusterInd[j]].ID, distributers[i].name);
                                assignDistributer(distributers[i].name);
                        }
                }
        });

        res.json({ success: true, message: "Successfully assigned" });
});

router.post("/done", async function (req, res) {
        let currentUser = await getUserBySessID(req.sessionID);

        if (isManager(currentUser)) {
                res.json({
                        success: false,
                        message: "You are unauthorized to complete distributions",
                });
                return;
        }
        doneDistribution(req.body.id);
        res.json({ success: true, message: "Successfully completed" });

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
        let retDist = null;
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
        newDistributions.forEach(d => {
                if (d.date == getCurrentDate())
                        retDist = d;
        });
        addMultDistributions(newDistributions);

        res.json({ success: true, message: "Distributions created", newDist: retDist });
});

module.exports = router;
