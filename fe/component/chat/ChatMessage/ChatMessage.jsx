//let Provider=ReactRedux.Provider;

let component=React.createClass({
    getInitialState:function(){
        return {
        };
    },
    handleMessage:function(messages){
        return messages.map((v,i)=>{
            return <div key={i} className="message">{v.text}</div>                        
        });
    },
    render: function() {
        return (
            <div className="Chat-area">
            <div className="message-wrap">
                {this.handleMessage(this.props.message)}
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
//component=ReactRedux.connect(mapStateToProps,mapDispatchToProps)(component);
return component;

