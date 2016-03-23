'use strict';
var express = require('express');
var path = require('path');
let url = require('url')

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
        console.log("connected")
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