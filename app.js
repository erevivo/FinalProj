var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



const session = require("express-session");


var app = express();


function setRouter(route, router) {
    app.use(route, require(router));
}


function setControllers() {
    setRouter('/', './routes/index');
    setRouter('/users', './routes/users');
    setRouter('/branches', './routes/branch');
    setRouter('/flowers', './routes/flowers');
    setRouter('/orders', './routes/orders');
    setRouter('/cart', './routes/cart');
    setErrHandling();
    app.emit('ready');
}
require('./models/mongo')(setControllers);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(function(req, res, next) {
//     setTimeout(next, 1000);
// });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "poo" }));

function setErrHandling() {
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next(createError(404));
    });
    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
}

module.exports = app;