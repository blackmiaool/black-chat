define("Input", ["common"], function(common) {
    let Input = React.createClass({
        getInitialState: function() {
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
            let store=this.props.store;
            store.dispatch({type:"sendMessage",data:this.state.text})
        },
        render: function() {
            return (
                <div className="Input-area">
                    <textarea className="input" name="" cols="30" rows="10" value={this.state.text} onChange={this.update}></textarea>
                    <div className="send clickable unselectable" onClick={this.submit}>发送&#40;<span className="underline">s</span>&#41;</div>
                </div>
            );
        }
    });
    return Input;
})