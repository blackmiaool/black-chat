/*jslint esversion: 6 */
/*jslint node: true*/
'use strict';
let through = require('through2');
let gutil = require('gulp-util');
let PluginError = gutil.PluginError;
let fs = require("fs");
const PLUGIN_NAME = 'blackmiaool manage tool';
let mkdirp = require('mkdirp');


let pageConfig = { //0:reference 1:Presentational 2 or obj:container
    logout: {},
    chat: {
        "common/CommonHeader": 0,
        LeftHeader: 1,
        RoomList: {
            Room:1
        },
        RootMain: {
            Title: 1,
            ChatMessage: 1,
            Tools: 1,
            Input: 1,
            Members: 1,
            Annunciator: 1,
        },
    },
    login: {
        "common/CommonHeader": 0,
        LoginForm: 2,
        RegisterForm: 1,
    },
    common: {
        CommonHeader: 1
    }
};
var tmpls = {
    componentJsContainer: {
        name: "container_component.jsx"
    },
    componentJsPresentational: {
        name: "presentational_component.jsx"
    },
    componentLess: {
        name: "component.less"
    },
    pageJsx: {
        name: "page.jsx"
    },
    pageLess: {
        name: "page.less"
    }
};

(function tmplsInit() {
    let tmplFolder = "tmpl/";
    for (let i in tmpls) {
        let v = tmpls[i];
        tmpls[i].content = fs.readFileSync(tmplFolder + v.name).toString();
    }
})();

function tmplsGet(name, data) {
    var src = tmpls[name].content;

    var pattern = new RegExp(/\{\{([\s\S]+?)\}\}/g);
    var target = src.replace(pattern, function (outterText, innerText) {
        return data[innerText];
    });
    return target;
}

function isObj(data) {
    return ({}).toString.call(data) === "[object Object]";
}

function findObj(obj, name) {
    for (let i in obj) {
        if (i === name && obj[i] !== 0) {
            return obj[i];
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

            });
            params = params.concat(extraParams);
            vars = vars.concat(extraVars);
            head = `define([${params.toString()}],function(${vars.toString()}){\n`;
            foot = `\n})`;
            file.contents = new Buffer(head + file.contents.toString() + foot, target_functions);
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

function getDeps(config, type) {
    let deps = [];
    for (let i in config) {
        let value = config[i];
        let item = {
            name: i,
            type: value
        };
        if (isObj(value)) {
            item.type = "obj";
        }
        if (type === "solid") {
            if (isObj(value)) {
                deps.push(item);
                deps = deps.concat(getDeps(value, type));
            } else if (value) {
                deps.push(item);
            }
        } else {
            deps.push(item);
            if (isObj(value)) {
                deps = deps.concat(getDeps(value));
            } else {

            }
        }
    }
    return deps;
}

function getAllDeps(config, type) {
    let ret = {};
    for (let i in config) {
        let page = i;
        let deps = getDeps(config[i], type);
        ret[i] = deps;
    }
    return ret;
}

function generateLess() {
    let allDeps = getAllDeps(pageConfig);
    for (let i in allDeps) {
        let page = i;
        let deps = allDeps[i];
        let lessInfo = `@import "common.less";\n@import "variables.less";\n@import "${page}/${page}.less";\n`;
        deps.forEach(function (name, i) {
            name = name.name;
            let paths = name.split("/");
            let pageName = page;
            let modName = name;
            if (paths.length > 1) {
                pageName = paths[0];
                modName = paths[1];
            }
            lessInfo += `@import "${pageName}/${modName}/${modName}.less";\n`;
        });
        let lessPath = `less/page/${page}.less`;
        fs.writeFileSync(lessPath, lessInfo);
        //        console.log(lessInfo);
    }
}
const componentDir = "component";

function generateComponent() {
    let allDeps = getAllDeps(pageConfig, "solid");
    for (let i in allDeps) {
        let page = i;

        let path = `${componentDir}/${page}`;
        try {
            fs.statSync(path).isDirectory(); //check if exist
        } catch (e) {
            mkdirp.sync(path);
            fs.writeFileSync(`${path}/${page}.jsx`, tmplsGet("pageJsx", {
                page
            }));
            fs.writeFileSync(`${path}/${page}.less`, tmplsGet("pageLess", {
                page
            }));
        }

        let deps = allDeps[i];
        deps.forEach(function (name, i) {
            let type = name.type;
            name = name.name;
            let path = `${componentDir}/${page}`;
            try {
                fs.statSync(`${path}/${name}`).isDirectory(); //check if exist
            } catch (e) {
                mkdirp.sync(`${path}/${name}`);
                fs.writeFileSync(`${path}/${name}/${name}.jsx`, tmplsGet(type == "obj" || type == "2" ? "componentJsContainer" : "componentJsPresentational", {
                    page, name
                }));
                fs.writeFileSync(`${path}/${name}/${name}.less`, tmplsGet("componentLess", {
                    page, name
                }));
                return false;
            }
        });
    }
    //    try {
    //        fs.statSync(widget_folder + get_widget_id()).isDirectory();
    //    } catch (e) {
    //        console.log("Widget " + get_widget_id() + " is not found (from pageConfig.js). Generate?(Y/N)");
    //        stop = true;
    //        not_found = true;
    //        generate_target = "widget";
    //        return false;
    //    }
}
// Exporting the plugin main function
module.exports = {
    componentsHandle,
    generateLess,
    generateComponent
};