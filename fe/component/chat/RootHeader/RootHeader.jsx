let Provider = ReactRedux.Provider;
const mapStateToProps = (state) => {
    return {
        state:state.headState
    }
}
const mapDispatchToProps = function(dispatch) {
    return {
        setHeadState:function(state){
            dispatch({type:"setHeadState",state});
        },
    }
}
let component=React.createClass({
    getInitialState:function(){
        return {
        };
    },
    render:function(){
        return (
            <div className="chat-RootHeader-component component">
            {this.props.state}
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
component = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(component);
return component;

