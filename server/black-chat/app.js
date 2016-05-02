'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
let chat = require("./chat.js")
var app = express();
let account = require('./account.js');
var cookieParser = require('cookie-parser');
let info = require("./info.js")
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
    if (!account.check(req.signedCookies.userName, req.signedCookies.token)) {
        res.clearCookie("userName");
        res.clearCookie("userNameJs");
        res.clearCookie("token");
    }
    res.sendfile(path.join(__dirname, '../../fe/index.html')); // load our public/index.html file
});
app.post('/pipe/signin', function (req, res) {
    //    res.cookie("test","123456",{signed:true})
    account.login(req.body, function (result) {
        res.status(200);
        res.send(JSON.stringify(result));
    }, res)
})
app.post('/pipe/getRoom', function (req, res) {
    res.status(200);
    //    let result = {
    //        recent: chat.rooms,
    //        friend: [],
    //        group: []
    //    }
    let rooms = info.getUserRooms();

    let rooms2 = rooms.map(function (v, i, a) {
        console.log(v.__proto__)
        return v.profile;
    })

    //    let result=info.getUserRooms().map(function(v,i){
    //        return v.profile;
    //    });
    res.send(JSON.stringify(rooms2));
})
app.post('/pipe/signup', function (req, res) {
    account.register(req.body, function (info) {
        if (!info.code) {
            setTimeout(function () {
                account.login(req.body, function (info2) {
                    res.status(200);
                    res.send(JSON.stringify(info2));
                }, res)
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