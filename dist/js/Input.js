"use strict";

define("Input", ["common"], function (common) {
    var _this = this;

    var Input = React.createClass({ displayName: "Input",
        getInitialState: function getInitialState() {
            console.log(_this);
            return { author: '', text: '' };
        },
        update: function update(event) {
            this.setState({ text: event.target.value });
        },
        submit: function submit() {
            console.log(this);
            console.log("mm");
            $.ajax({
                type: 'POST',
                url: "http://localhost:9999/pipe/submit",
                data: { data: this.state.text },
                //                dataType: "json",
                timeout: 5000,
                success: function success(response) {
                    pre_data_handle(response);
                },
                error: function error(response) {
                    console.log(response);
                    //                    pre_data_handle(response);                 
                }
            });
        },
        render: function render() {
            return React.createElement("div", null, React.createElement("textarea", { name: "", cols: "30", rows: "10", value: this.state.text, onChange: this.update }), React.createElement("button", { onClick: this.submit }, "提交"));
        }
    });
    return Input;
});