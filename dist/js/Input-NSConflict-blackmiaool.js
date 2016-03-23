"use strict";

define("Input", ["common"], function (common) {
    var Input = React.createClass({ displayName: "Input",
        getInitialState: function getInitialState() {
            return {
                author: '',
                text: ''
            };
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
        render: function render() {
            return React.createElement("div", { className: "Input-area" }, React.createElement("textarea", { className: "input", name: "", cols: "30", rows: "10", value: this.state.text, onChange: this.update }), React.createElement("div", { className: "send clickable unselectable", onClick: this.submit }, "发送(", React.createElement("span", { className: "underline" }, "s"), ")", React.createElement("div", { class: "menu" })));
        }
    });
    return Input;
});