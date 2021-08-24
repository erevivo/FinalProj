var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cron = require("node-cron");

const session = require("express-session");
const { errorMonitor } = require("events");

var app = express();

function setRouter(route, router) {
        app.use(route, require(router));
}

function setControllers() {
        //TODO: fix the routers
        app.use("/", express.static(path.join(__dirname, 'views', 'build')));
        setRouter("/users", "./routes/users");
        setRouter("/distributions", "./routes/distribution");
        setRouter("/blogs", "./routes/blog");
        setRouter("/messages", "./routes/messages");
        setErrHandling();
        const { unassignAll } = require("./models/users");
        cron.schedule("0 0 * * *", unassignAll);
        app.emit("ready");
}
require("./models/mongo")(setControllers);
// view engine setup
// app.set("views", path.join(__dirname, "views"));

// app.use(function(req, res, next) {
//     setTimeout(next, 1000);
// });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "poo" }));


function setErrHandling() {
        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
                next(createError(404));
        });
        // error handler
        app.use(function (err, req, res, next) {
                console.log(err);
                // set locals, only providing error in development
                res.locals.message = err.message;
                res.locals.error =
                        req.app.get("env") === "development" ? err : {};
                // render the error page
                res.status(err.status || 500);
                res.json({err:err});
        });
}

module.exports = app;
