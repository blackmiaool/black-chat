"use strict";

//var header=React.createClass({
//    render:function(){
//        return (
//           
//        );
//    }
//});
define("Root", ["RootHeader", "RootMain"], function (RootHeader, RootMain) {
    var Root = React.createClass({ displayName: "Root",
        render: function render() {
            return React.createElement("div", null, React.createElement(RootHeader, null), React.createElement(RootMain, null));
        }
    });
    ReactDOM.render(React.createElement(Root, null), $("#wrap")[0]);
});