"use strict";

define("Chat", ["common"], function (common) {
    var Chat = React.createClass({ displayName: "Chat",

        render: function render() {
            return React.createElement("div", { className: "Chat-area" }, this.props.message.map(function (v, i) {
                return React.createElement("p", { key: i }, v);
            }));
        }
    });
    return Chat;
});