define( ["common"], function(common) {
    let Input = React.createClass({
        getInitialState: function() {
            return {
                author: '',
                text: ''
            };
        },
        componentDidMount:function(){
            this.$dom=$(ReactDOM.findDOMNode(this));
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
        keyHandle:function(event){                
            if((event.ctrlKey&&event.key==="Enter")||
               (event.altKey&&event.keyCode===83)){//ctrl+enter and alt+s 
                this.submit();
            }
        },
        render: function() {
            return (
                <div className="Input-area">
                    <textarea className="input" name="" cols="30" rows="10" value={this.state.text} onChange={this.update} onKeyDown={this.keyHandle}></textarea>
                    <div className="send-wrap">
                    <button className="send clickable unselectable" onClick={this.submit}>
                    发送&#40;<span className="underline">s</span>&#41;
                    </button> 
                    
                    <span className="menu-head clickable">&nbsp;<span className="caret"></span></span>    
                    </div>
                     
                </div>
            );
        }
    });
    return Input;
})