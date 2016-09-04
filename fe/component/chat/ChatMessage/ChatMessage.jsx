//let Provider=ReactRedux.Provider;

let component=React.createClass({
    getInitialState:function(){
        this.user=common.getCookie("userNameJs");
        return {
        };
    },
    handleMessage:function(messages=[]){
//        console.log(messages)
        return messages.map((v,i)=>{
            return (
                <div key={i} className="message" data-role={v.user.name==this.user}>
                   <div className="icon">
                       <img src={v.user.icon} alt=""/>
                   </div>
                   <h4 className="name">
                       {v.user.name}
                   </h4>
                   <div className="content-wrap-wrap">
                       <span className="content-wrap">
                           <span className="content">
                               {v.text}
                           </span>
                       </span> 
                   </div>
                                      
                </div>  );                      
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

