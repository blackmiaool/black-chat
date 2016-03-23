"use strict";

define("Input", ["common"], function (common) {
    var Input = React.createClass({ displayName: "Input",
        getInitialState: function getInitialState() {
            return {
                author: '',
                text: ''
            };
        },
        componentDidMount: function componentDidMount() {
            this.$dom = $(ReactDOM.findDOMNode(this));
        },
        update: function update(event) {
            this.setState({
                text: event.target.value
            });
        },
        submit: function submit() {
            var store = this.props.store;
            store.dispatch({ type: "sendMessage", data: this.state.text });
        },
        keyHandle: function keyHandle(event) {
            if (event.ctrlKey && event.key === "Enter" || event.altKey && event.keyCode === 83) {
                //ctrl+enter and alt+s
                this.submit();
            }
        },
        render: function render() {
            return React.createElement("div", { className: "Input-area" }, React.createElement("textarea", { className: "input", name: "", cols: "30", rows: "10", value: this.state.text, onChange: this.update, onKeyDown: this.keyHandle }), React.createElement("div", { className: "send-wrap" }, React.createElement("button", { className: "send clickable unselectable", onClick: this.submit }, "发送(", React.createElement("span", { className: "underline" }, "s"), ")"), React.createElement("span", { className: "menu-head clickable" }, " ", React.createElement("span", { className: "caret" }))));
        }
    });
    return Input;
});