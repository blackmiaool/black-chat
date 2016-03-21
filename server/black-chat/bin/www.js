#!/usr/bin/env node

/**
 * Module dependencies.
 */
'use strict';
var app = require('../app');
var debug = require('debug')('black-chat:server');
var http = require('http');
let url = require('url')

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
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
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
    case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
    default:
        throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}