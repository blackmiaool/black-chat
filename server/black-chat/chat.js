'use strict';
var express = require('express');
var path = require('path');
let url = require('url')
let cookieParser = require('cookie-parser')
let cookie = require('cookie');
let io = require("./io.js");
let account = require('./account.js');
let info = require("./info.js");
let rooms = info.rooms;


//let rooms = io.readFileJsonSyncForce(roomFileName, initRoom);
//console.log(rooms)
let Chat = {}
Chat.init = function (server) {
    let WebSocket = require("ws")

    var WebSocketServer = require("ws").Server;

    var wsserver = new WebSocketServer({
        server: server,
        path: "/pipe/submit",
    });
    let wss = [];

    wsserver.on('connection', function (ws) {
        if (!ws.upgradeReq.headers.cookie)
            return;
        var cookiesRaw = cookie.parse(ws.upgradeReq.headers.cookie);
//        console.log(cookiesRaw);
        let cookies = {};
        for (var i in cookiesRaw) {
            let cookie = cookieParser.signedCookie(cookiesRaw[i], "m5345sdpymvkffglgmkg3453453453453453yeygh34gfwsrfgdvbllllhygmvyug");
            if (cookie != cookiesRaw[i])
                cookies[i] = cookie;
        }

        let usr = account.check(cookies.userName, cookies.token);
        if (!cookies.userName || !cookies.token || !usr) {
            ws.close();
            return;
        }
        let userRooms = info.getUserRooms(usr.name);
  
            for (let j in userRooms) {
                let room = userRooms[j];

                room.addMember(usr)
            }
        
     
        ws.interval = setInterval(() => {
            
            if (ws.readyState == WebSocket.OPEN) {
                ws.send("");
            } else {
                let index = wss.indexOf(ws);
                if (index >= 0) {
                    onUsrLeave();
                }

            }
        }, 5000)
        var len = wss.push(ws);

        function onUsrLeave() {
            wss.splice(wss.indexOf(ws), 1);
            clearInterval(ws.interval);
      
                for (let j in userRooms) {
                    let room = userRooms[j];
                    room.removeMember(usr)
                }
            
            
        }
        var location = url.parse(ws.upgradeReq.url, true);
        // you might use location.query.access_token to authenticate or share sessions 
        // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312) 

        ws.on('message', function (message) {
//            console.log('received: %s', message);
            wss.forEach(function (v, index) {
                let ws = v;
                if (ws.readyState == WebSocket.OPEN) {
                    ws.send(message);
                } else {

                    let index = wss.indexOf(ws);
                    if (index >= 0) {
                        onUsrLeave();
                    }
                }

            })
        });

    });
}
Chat.rooms = rooms;



module.exports = Chat;