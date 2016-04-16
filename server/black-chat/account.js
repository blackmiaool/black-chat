/*jslint node: true*/
/*jslint es5: true */
'use strict';
let io = require("./io.js");
let path = require('path');
let randomString = require('random-string');
let accountFileName = path.join(__dirname, "..", "data", "accounts.json");


let accounts = io.readFileJsonSyncForce(accountFileName);

function login(data, cb, res) {
    let accountToken = randomString({
        length: 20
    });
    let user = accounts[data.userName];
    if (user) {
        if (user.pwd && user.pwd == data.passwd) {
            res.cookie("userName", user.name, {
                signed: true
            });
            res.cookie("userNameJs", user.name);
            res.cookie("token", user.token, {
                signed: true
            });
            cb({
                msg: "ok",
                code: 0,
            });
        } else {
            console.log(user.pwd == data.passwd)
            cb({
                msg: "bad pwd",
                code: "-2",
            });
        }
    } else {
        cb({
            msg: "User name doesn't exist.",
            code: -1,
        });
    }
}

function checkRegisterInfo(data) {
    let userName = data.userName;
    let pwd = data.passwd;
    let ret;
    if (accounts[userName]) {
        ret = {
            msg: "User name is already exist.",
            code: -2,
        };
    } else if (!userName || typeof userName != "string" || !userName.length) {
        ret = {
            msg: "No user name.",
            code: -3,
        };
    } else if (!pwd || !pwd.length) {
        ret = {
            msg: "No password.",
            code: -4,
        };
    } else if (userName.length > 20) {
        ret = {
            msg: "User name exceeds 20 chars.",
            code: -5,
        };
    } else if (pwd.length > 50) {
        ret = {
            msg: "User name exceeds 50 chars.",
            code: -6,
        };
    }else if (userName.match(/[\w\-+!?@#$^*\(\)]*/)[0]!==userName) {
        let badChars=userName.replace(/[\w\-+!?@#$^*\(\)]*/g,"");
        ret = {
            msg: `User name contains spectial chars: ${badChars}.`,
            code: -7,
        };
    }else{
        ret=false;
    }
    return ret;
}

function register(data, cb) {
    console.log(data);
    let checkResult = checkRegisterInfo(data);
    if (!checkResult.code) {
        let accountToken = randomString({
            length: 20
        });
        accounts[data.userName] = {
            name: data.userName,
            pwd: data.passwd,
            token: accountToken
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
    } else {
        cb(checkResult);
    }

}

module.exports = {
    check: function (req, res) {
        if (!accounts[req.signedCookies.userName]) {
            return;
        }
        if (accounts[req.signedCookies.userName].token != req.signedCookies.token) {
            res.clearCookie("userName");
            res.clearCookie("userNameJs");
            res.clearCookie("token");
        }
    },
    login,
    register,
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