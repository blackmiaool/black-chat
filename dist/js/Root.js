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
        getInitialState: function getInitialState() {
            var _this = this;

            var rootStore = function rootStore() {
                var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                var action = arguments[1];

                switch (action.type) {
                    case "setHeadState":
                        state.headState = action.data;
                        break;
                }
                return state;
            };
            var store = Redux.createStore(rootStore);
            store.subscribe(function () {
                _this.setState({
                    headState: store.getState().headState
                });
            });
            return { store: store, headState: "离线" };
        },
        render: function render() {
            return React.createElement("div", null, React.createElement(RootHeader, { store: this.state.store, headState: this.state.headState }), React.createElement(RootMain, { store: this.state.store }));
        }
    });
    ReactDOM.render(React.createElement(Root, null), $("#wrap")[0]);
});