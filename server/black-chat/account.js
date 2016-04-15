//const mongoUrl=`mongodb://localhost:27017/learnyoumongo`;
//let mongo = require('mongodb').MongoClient
//mongo.connect(mongoUrl, function (err, db) {
//    // db gives access to the database
//})
'use strict';
let io = require("./io.js");
let path = require('path');
let accountFileName = path.join(__dirname, "data", "accounts.json");
let accounts = io.readFileJsonSync(accountFileName);
module.exports = {
    login: function (data, cb) {
        let randomString = require('random-string');
        let account = randomString({
            length: 20
        });

        if (accounts[data.userName]) {
            cb({
                msg: "User name is already exist",
                code: -2,
            });
        } else {
            cb({
                msg: "User name doesn't exist.",
                code: -1,
            });
        }

        //        return cb({
        //            message: 'login failed',
        //            error: 'not implemented',
        //            stack: new Error().stack
        //        })
    },
    register: function (data, cb) {
        
        console.log(data);

        if (accounts[data.userName]) {
            cb({
                msg: "User name is already exist",
                code: -2,
            });
        } else {
            accounts[data.userName] = {
                name:data.userName,
                pwd:data.passwd,                
            };
            setTimeout(function () {
                io.writeFileJson(accountFileName, accounts, function (err) {
                    if (err) {
                        cb({
                            msg: "failed",
                            code: -1,
                            statck: err.stack,
                        });
                    } else {
                        cb({
                            msg: "ok",
                            code: 0,
                        });
                    }

                });
            });
        }


        //        return cb({
        //            message: 'register failed',
        //            error: 'not implemented',
        //            stack: new Error().stack
        //        })
    },
    deserializeUser: function (data, cb) {
        return cb({
            message: 'deserializeUser failed',
            error: 'not implemented',
            stack: new Error().stack
        })
    },
    serializeUser: function (data, cb) {
        return cb({
            message: 'serializeUser failed',
            error: 'not implemented',
            stack: new Error().stack
        })
    },
    removeUser: function (data, cb) {
        return cb({
            message: 'removeUser failed',
            error: 'not implemented',
            stack: new Error().stack
        })
    }
}