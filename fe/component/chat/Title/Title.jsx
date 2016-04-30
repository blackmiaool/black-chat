let Provider=ReactRedux.Provider;
const mapStateToProps = (state) => {
    return {
        title:state.currentRoom.name
    }
}
const mapDispatchToProps = function (dispatch) {
    return {
    }
}
let component=React.createClass({
    getInitialState:function(){
        return {
        };
    },
    render:function(){
        return (
            <div className="chat-Title-component component">
            <h4 className="title">{this.props.title}</h4>
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

