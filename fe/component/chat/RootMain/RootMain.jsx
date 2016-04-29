let Provider = ReactRedux.Provider;
const mapStateToProps = (state) => {
    return {
        message:state.message
    }
}
const mapDispatchToProps = function (dispatch) {
    return {
        setHeadState: function (state) {
            dispatch({
                type: "setHeadState",
                state
            });
        },
    }
}
let component = React.createClass({
    getInitialState: function () {
        return {
            author: '',
            text: '',
        };
    },
    render: function () {
//        return (
//
//            
//        );
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