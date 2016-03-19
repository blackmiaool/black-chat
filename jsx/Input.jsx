define("Input", ["common"], function(common) {
    let Input = React.createClass({
        getInitialState: function() {
            console.log(this);
            var socket=new WebSocket(`ws://${location.host}/pipe/submit`);
            this.socket= socket;
            socket.onopen = function(event) {
                socket.send('I am the client and I\'m listening!');
                socket.onmessage = function(event) {
                    console.log('Client received a message', event);
                };
                socket.onclose = function(event) {
                    console.log('Client notified socket has closed', event);
                };
            };
            return {
                author: '',
                text: ''
            };
        },
        update: function(event) {
            this.setState({
                text: event.target.value
            });
        },
        submit: function() {
            console.log(this)
            console.log("mm");
            let socket=this.socket;
            socket.send(this.state.text);
        },
        render: function() {
            return (
                <div>
                    <textarea name="" cols="30" rows="10" value={this.state.text} onChange={this.update}></textarea>
                    <button onClick={this.submit}>提交</button>
                </div>
            );
        }
    });
    return Input;
})