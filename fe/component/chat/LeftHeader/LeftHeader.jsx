const mapStateToProps = (state) => {
    console.log(state);
    return {state:state.headState}
}
const mapDispatchToProps = function(dispatch) {
    return {}
}
let component = React.createClass({
    getInitialState: function() {
        return {};
    },
    render: function() {
        return (
            <div className="chat-LeftHeader-component component">
            <div className="avatar-area">
                <div className="connection-state" data-state={this.props.state} title={this.props.state}>
                    
                </div>
            </div>
            <div className="group-area"></div>
            <div className="tools-area"></div>
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
component=ReactRedux.connect(mapStateToProps,mapDispatchToProps)(component);
return component;