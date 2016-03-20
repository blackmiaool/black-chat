"use strict";

define("RootHeader", function () {
    var RootHeader = {};
    RootHeader = React.createClass({ displayName: "RootHeader",
        getInitialState: function getInitialState() {

            return {};
        },
        setHeadText: function setHeadText() {},
        setParentStore: function setParentStore(store) {},
        render: function render(store) {
            this.setParentStore(this.props.store);
            return React.createElement("div", { className: "root-header" }, this.props.headState == "online" ? "在线" : "离线");
        }
    });
    return RootHeader;
});