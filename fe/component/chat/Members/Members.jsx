const mapStateToProps = (state) => {
    return {}
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
            <div className="chat-Members-component component">
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