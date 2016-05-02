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
        usr.ws = ws;
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
            }
        }, 5000)

        function onUsrLeave() {
            clearInterval(ws.interval);

            for (let j in userRooms) {
                let room = userRooms[j];
                room.removeMember(usr)
            }


        }
        var location = url.parse(ws.upgradeReq.url, true);
        // you might use location.query.access_token to authenticate or share sessions 
        // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312) 

        ws.on('close', function close() {
            onUsrLeave();
        });
        ws.on('message', function (message) {
            //            console.log('received: %s', message);
            message = JSON.parse(message);
            let roomId = message.room;
            let content = message.content;
            let room = info.rooms[roomId];
            for (var i in room.members) {
                let ws = room.members[i].ws;
                if (ws.readyState == WebSocket.OPEN) {
                    ws.send(JSON.stringify({content,room:roomId,user:usr.name}));
                }
            }
        });

    });
}
Chat.rooms = rooms;



module.exports = Chat;