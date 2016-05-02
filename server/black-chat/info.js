'use strict';
let io = require("./io.js");
var path = require('path');
let roomFileName = path.join(__dirname, "..", "data", "room.json");
let Room = function (profile) {
    this.profile = profile;
    this.profile.members = {}
    this.members = {};
}
Room.prototype.addMember = function (usr) {
    this.members[usr.name] = usr;
    this.profile.members[usr.name] = {
        name: usr.name,
        icon: usr.icon || "/icon.png"
    };
};
Room.prototype.getProfile = function () {
    return this.profile;
};
Room.prototype.removeMember = function (usr) {
    delete this.members[usr.name]
    delete this.profile.members[usr.name];
};

let initRoom = [
    (new Room({
        name: "common",
        uid: 0,
        icon: {
            url: "/icon.png"
        },
        index: 0,
        bulletin: "测试用房间",
    })).getProfile(),
    (new Room({
        name: "common2",
        uid: 1,
        icon: {
            url: "/icon.png"
        },
        index: 1,
        bulletin: "",
    })).getProfile(),
        ];
let rooms = io.readFileJsonSyncForce(roomFileName, initRoom);
rooms = rooms.map(function (v, i) {
    return new Room(v);
})


function getUserRooms() {
    return rooms;
}
let expor = {
    getUserRooms,
    rooms
};
module.exports = expor;