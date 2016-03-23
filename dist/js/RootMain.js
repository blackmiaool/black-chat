'use strict';

define("RootMain", ['Tabs', 'Title', 'Menus', 'Chat', 'Input', 'Info', 'LeftPanel', 'Tools'], function (Tabs, Title, Menus, Chat, Input, Info, LeftPanel, Tools) {
    var RootMain = React.createClass({ displayName: "RootMain",
        getInitialState: function getInitialState() {
            var _this = this;

            var socket = new WebSocket('ws://' + location.host + '/pipe/submit');
            this.socket = socket;
            var message = ["a", "b"];
            socket.onopen = function (event) {
                _this.props.store.dispatch({
                    type: "setHeadState",
                    data: "online"
                });
                //                socket.send("")
                socket.onmessage = function (event) {
                    //                    console.log('Client received a message', event);
                    //                    console.log(message)
                    if (!event.data) return;
                    message.push(event.data);
                    _this.setState({
                        message: message
                    });
                };
                socket.onclose = function (event) {
                    console.log('Client notified socket has closed', event);
                    _this.props.store.dispatch({
                        type: "setHeadState",
                        data: "offline"
                    });
                };
            };
            var coreStore = function coreStore(state, action) {
                switch (action.type) {
                    case "sendMessage":
                        socket.send(action.data);
                        break;
                }
            };

            var store = Redux.createStore(coreStore);
            return {
                author: '',
                text: '',
                store: store,
                message: message
            };
        },
        render: function render() {
            return React.createElement("div", { className: "root-main-area" }, React.createElement(LeftPanel, { className: "left" }), React.createElement("div", { className: "right" }, React.createElement(Tabs, null), React.createElement(Title, null), React.createElement(Menus, null), React.createElement(Chat, { message: this.state.message }), React.createElement(Tools, null), React.createElement(Input, { store: this.state.store })), React.createElement(Info, null));
        }
    });
    return RootMain;
});