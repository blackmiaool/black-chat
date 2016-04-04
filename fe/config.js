'use strict';
let through = require('through2');
let gutil = require('gulp-util');
let PluginError = gutil.PluginError;
let fs = require("fs")
const PLUGIN_NAME = 'blackmiaool manage tool';



let pageConfig = {
    chat: {
        RootHeader: 1,
        RootMain: {
            Tabs: 1,
            Title: 1,
            Menus: 1,
            ChatMessage: 1,
            Input: 1,
            Info: 1,
            LeftPanel: 1,
            Tools: 1,
        },
    },
    login: {
        "common/CommonHeader": 0,
        LoginForm: 1,
        RegisterForm: 1,
    },
    common: {
        CommonHeader: 1
    }
}

function tmpls_generate(file, data) {
    var src = tmpls[file];

    var pat = new RegExp(/\{\{([\s\S]+?)\}\}/g);
    var target = src.replace(pat, function (outter_text, inner_text) {
        return data[inner_text];
    })
    return target;
}

function isObj(data) {
    return ({}).toString.call(data) === "[object Object]";
}

function findObj(obj, name) {
    for (let i in obj) {
        if (i === name && obj[i] !== 0) {
            return obj[i]
        } else {
            if (isObj(obj[i])) {
                let result = findObj(obj[i], name);
                if (result)
                    return result;
            }
        }
    }
}

function getDep(page, name) {

    let pageContent;
    if (!page) {
        pageContent = pageConfig;
    } else {
        pageContent = pageConfig[page];
    }

    let mod = findObj(pageContent, name);
    let deps = [];
    for (let i in mod) {
        deps.push(i);
    }
    return deps;
}


function componentsHandle(target_functions) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }
        if (file.isBuffer()) {
            const paths = file.path.split(/[\/\\]/);
            const page = paths[paths.length - 3];
            const modName = paths[paths.length - 2];
            const fileName = paths[paths.length - 1];
            const isRoot = page === "component";
            let deps = getDep(!isRoot && page, modName);
            if (deps.constructor == Array) {
            }
            let head = "";
            let foot;
            let modHead = "/dist/js";
            let extraParams = ["'common'"];
            let extraVars = ["common"];
            let params = [];
            let vars = [];
            deps.forEach(function (name, i) {
                let names = name.split("/");
                name = names[names.length - 1];
                vars[i] = name;
                let pagePath = names.length > 1 ?
                    names[0] : (isRoot ? modName : page);
                params[i] = `'${modHead}/${pagePath}/${name}/${name}.js'`;

            })
            params = params.concat(extraParams);
            vars = vars.concat(extraVars);
            head = `define([${params.toString()}],function(${vars.toString()}){\n`;
            foot = `\n})`
            file.contents = new Buffer(head + file.contents.toString() + foot, target_functions)
            if (fileName != modName + ".jsx") {
                this.emit('error', new PluginError(PLUGIN_NAME, `file name doesn't match path name path:${page}/${modName} file:${fileName}`));
            }

        }
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }

        cb(null, file);
    });
}

function generateLess() {
    function getDeps(config) {
        let deps = [];
        for (let i in config) {
            deps.push(i);
            if (isObj(config[i])) {
                deps = deps.concat(getDeps(config[i]))
            }

        }
        return deps;
    }
    for (let i in pageConfig) {
        let page = i;
        let deps = getDeps(pageConfig[i]);
//        console.log(page, deps);
        let lessInfo = `@import "../common.less";
                        @import "../variables.less";\n`;
        deps.forEach(function (name, i) {
            let paths = name.split("/");
            let pageName = page;
            let modName = name;
            if (paths.length > 1) {
                pageName = paths[0];
                modName = paths[1];
            }
            lessInfo += `@import "@{componentPath}/${pageName}/${modName}/${modName}.less";\n`;
        })
        let lessPath = `less/page/${page}.less`
        fs.writeFileSync(lessPath, lessInfo);
//        console.log(lessInfo);
    }
}
// Exporting the plugin main function
module.exports = {
    componentsHandle: componentsHandle,
    generateLess
};