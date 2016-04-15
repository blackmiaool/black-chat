'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
let account = require('./account.js');
var cookieParser = require('cookie-parser')
app.use(cookieParser("m5345sdpymvkffglgmkg3453453453453453yeygh34gfwsrfgdvbllllhygmvyug"));
// view engine setup3
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use("/", express.static(path.join(__dirname, '../../fe/')));
app.get(/^\/\w+\/?$/, function (req, res) {
    res.sendfile(path.join(__dirname, '../../fe/index.html')); // load our public/index.html file
}); 
app.post('/pipe/signup', function (req, res) {
    res.cookie("test","123456",{signed:true})
    account.register(req.body, function (info) {
        if (!info.code&&false) {
            setTimeout(function () {
                account.login(req, function () {

                })
            })

        } else {
            res.status(200);
            res.send(JSON.stringify(info));
        }

    });
})
app.post('/pipe/profile', function (req, res) {

    })
    //app.use("/chat/\w*",express.static(path.join(__dirname, '../../fe/')));
    //app.use('/', routes);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;