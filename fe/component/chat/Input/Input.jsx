let Provider=ReactRedux.Provider;
let component=React.createClass({
    getInitialState:function(){
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
        this.props.submit({text:this.state.text});        
    },
    keyHandle:function(event){                
        if((event.ctrlKey&&event.key==="Enter")||
           (event.altKey&&event.keyCode===83)){//ctrl+enter and alt+s 
            this.props.submit({text:this.state.text});
        }
    },
    render:function(){
        return (
            <div className="chat-Input-component component">
                  <textarea className="input" name="" cols="30" rows="10" value={this.state.text} onChange={this.update} onKeyDown={this.keyHandle}></textarea>
                <div className="send-wrap">
                <button className="send clickable unselectable" onClick={this.submit}>
                发送&#40;<span className="underline">s</span>&#41;
                </button> 

                <span className="menu-head clickable">&nbsp;<span className="caret"></span></span>    
                </div>
            </div>
        );
    },
//    getDefaultProps:function(){
//        
//    },
//    propTypes:{
//        
//    },
//    mixins:[],    
//    statics: {
//        
//    },
//    componentWillMount:function(){
//        
//    },
//    componentDidMount:function(){
//        
//    },
//    componentWillReceiveProps:function(nextProps){
//        
//    },
//    shouldComponentUpdate: function(nextProps, nextState) {
//
//    },
//    componentWillUpdate:function(nextProps, nextState){
//        
//    },
//    componentDidUpdate:function(prevProps,prevState){
//        
//    },
//    componentWillUnmount:function(){
//        
//    }    
});
return component;

