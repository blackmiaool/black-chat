'use strict';
var express = require('express');
var path = require('path');
let url = require('url')
let cookieParser = require('cookie-parser')
let cookie = require('cookie');
let io = require("./io.js");
let account = require('./account.js');

let Chat = function (server) {
    let WebSocket = require("ws")
    
    var WebSocketServer = require("ws").Server;

    var wsserver = new WebSocketServer({
        server: server,
        path: "/pipe/submit",
    });
    let wss = [];
    console.log(WebSocket.CONNECTING, WebSocket.OPEN, WebSocket.CLOSING, WebSocket.CLOSED)
    wsserver.on('connection', function (ws) {
        if(!ws.upgradeReq.headers.cookie)
            return;
       var cookiesRaw = cookie.parse(ws.upgradeReq.headers.cookie);
        console.log(cookiesRaw);
        let cookies={};
        for(var i in cookiesRaw){
           let cookie=cookieParser.signedCookie(cookiesRaw[i],"m5345sdpymvkffglgmkg3453453453453453yeygh34gfwsrfgdvbllllhygmvyug");
            if(cookie!=cookiesRaw[i])
            cookies[i]=cookie;
        } 
        for(var i in ws){
            console.log(i);
        }
        if(cookies.userName&&cookies.token){
            if(account.check(cookies.userName,cookies.token)){
                
            }else{
                ws.close();
                return;
            }
        }else{
            ws.close();
            return;
        }
        console.log(cookies);
        ws.interval = setInterval(() => {
            console.log("interval", ws.readyState)
            if (ws.readyState == WebSocket.OPEN) {
                ws.send("");
            } else {

                let index = wss.indexOf(ws);
                if (index >= 0) {
                    wss.splice(wss.indexOf(ws), 1);
                    clearInterval(ws.interval);
                }

            }
        }, 5000)
        var len = wss.push(ws);

        var location = url.parse(ws.upgradeReq.url, true);
        // you might use location.query.access_token to authenticate or share sessions 
        // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312) 

        ws.on('message', function (message) {
            console.log('received: %s', message);
            wss.forEach(function (v, index) {
                let ws = v;
                if (ws.readyState == WebSocket.OPEN) {
                    ws.send(message);
                } else {

                    let index = wss.indexOf(ws);
                    if (index >= 0) {
                        wss.splice(wss.indexOf(ws), 1);
                        clearInterval(ws.interval);
                    }
                }

            })
        });

    });
}




module.exports = Chat;