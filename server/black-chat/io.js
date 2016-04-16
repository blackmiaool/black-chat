'use strict';

let fs = require("fs");

function readFileJson(fileName, cb) {
    fs.readFile(fileName, (err, data) => {
        if (err) throw err;
        cb(JSON.parse(data.toString()));
    });
}

function readFileJsonSync(fileName) {
    let content = fs.readFileSync(fileName);
    return JSON.parse(content.toString());
}



function writeFileJson(fileName, data, cb) {
    data = JSON.stringify(data);
    fs.writeFile(fileName, data, cb);
}

function writeFileJsonSync(fileName, data) {
    data = JSON.stringify(data);

    fs.writeFileSync(fileName, data);
}

function readFileJsonSyncForce(fileName, defaultValue) {
    if (defaultValue === undefined) {
        defaultValue = {};
    }
    let ret; 
    try {
        ret = allExports.readFileJsonSync(fileName);
    } catch (e) {
        if (!ret) {
            allExports.writeFileJsonSync(fileName, defaultValue);
        }
        ret = allExports.readFileJsonSync(fileName);
    }
    return ret;
}
let allExports = {
    readFileJson,
    readFileJsonSync,
    writeFileJson,
    writeFileJsonSync,
    readFileJsonSyncForce,
};
module.exports = allExports;