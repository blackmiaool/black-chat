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

function writeFileJson(fileName,data,cb) {
    data=JSON.stringify(data);
    console.log(fileName,data)
    fs.writeFile(fileName,data,cb);
}
function writeFileJsonSync(fileName,data) {
    data=JSON.stringify(data);
    
    fs.writeFileSync(fileName,data);    
}
module.exports = {
    readFileJson,
    readFileJsonSync,
    writeFileJson,
    writeFileJsonSync,
}