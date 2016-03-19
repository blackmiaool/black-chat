"use strict";

define("Input", ["common"], function (common) {
    var Input = React.createClass({ displayName: "Input",
        getInitialState: function getInitialState() {
            console.log(this);
            var socket = new WebSocket("ws://" + location.host + "/pipe/submit");
            this.socket = socket;
            socket.onopen = function (event) {
                socket.send('I am the client and I\'m listening!');
                socket.onmessage = function (event) {
                    console.log('Client received a message', event);
                };
                socket.onclose = function (event) {
                    console.log('Client notified socket has closed', event);
                };
            };
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
            console.log(this);
            console.log("mm");
            var socket = this.socket;
            socket.send(this.state.text);
        },
        render: function render() {
            return React.createElement("div", null, React.createElement("textarea", { name: "", cols: "30", rows: "10", value: this.state.text, onChange: this.update }), React.createElement("button", { onClick: this.submit }, "提交"));
        }
    });
    return Input;
});