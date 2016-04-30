const mapStateToProps = (state) => {
    return {
        content:state.currentRoom.bulletin
    }
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
            <div className="chat-Bulletin-component component">
                <span className="title">Bulletin</span>
                <span className="edit-icon glyphicon glyphicon-wrench" title="管理员才能修改公告"/>
                <p className="content">{this.props.content}</p>
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