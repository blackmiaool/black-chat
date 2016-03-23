"use strict";

define("Chat", ["common"], function (common) {
    var $$ = void 0;

    function checkScroll() {}
    var Chat = React.createClass({ displayName: "Chat",
        getInitialState: function getInitialState() {

            return {};
        },
        componentDidMount: function componentDidMount() {
            this.$dom = $(ReactDOM.findDOMNode(this));
            $$ = this.$dom.find.bind(this.$dom);
        },
        handleMessage: function handleMessage(messages) {
            console.log("lkjkl");
            return messages.map(function (v, i) {
                return React.createElement("div", { key: i, className: "message" }, v);
            });
        },
        render: function render() {
            return React.createElement("div", { className: "Chat-area" }, React.createElement("div", { className: "message-wrap" }, this.handleMessage(this.props.message)));
        }
    });
    return Chat;
});