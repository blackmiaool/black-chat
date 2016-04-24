const mapStateToProps = (state) => {
//    console.log(state);
    return {state:state.headState,currentTab:state.chatTab}
}
const mapDispatchToProps = function(dispatch) {
    return {
        setChatTab:function(name){
            dispatch({type:"setChatTab",name})
        }
    }
}

let component = React.createClass({
    getInitialState: function() {

        return {};
    },
//    setChatTab:function(name){
//        console.log(12,name,this)
//        this.props.currentTab=name;
//    },
    render: function() {
        return (
            <div className="chat-LeftHeader-component component">
            <div className="avatar-area">
                <div className="connection-state" data-state={this.props.state} title={this.props.state}>
                    
                </div>
            </div>
            <div className="group-area">                
                <span className="glyphicon glyphicon-comment" data-state={this.props.currentTab=="recent"&&1} onClick={this.props.setChatTab.bind(this,"recent")}></span>
                <span className="glyphicon glyphicon-user" data-state={this.props.currentTab=="friend"&&1} onClick={this.props.setChatTab.bind(this,"friend")}></span>
                <span className="glyphicon glyphicon-home" data-state={this.props.currentTab=="group"&&1} onClick={this.props.setChatTab.bind(this,"group")}></span>
            </div>
            <div className="tools-area"></div>
            </div>
        ); 
    },
//    getDefaultProps:function(){
//      return {currentTab:"recent"}
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