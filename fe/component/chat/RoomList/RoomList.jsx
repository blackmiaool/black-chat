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
    handleChangeSearch:function(event){
        this.state.search=event.target.value;
    },
    render: function() {
        return (
            <div className="chat-RoomList-component component">
            <div className="header">
               <div className="input-wrap">
                 
                  <input type="text" onChange={this.handleChangeSearch} value={this.state.search}/> 
                  <span className="glyphicon glyphicon-search"></span>
               </div>
                
            </div>
            <div className="body">
                
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
component=ReactRedux.connect(mapStateToProps,mapDispatchToProps)(component);
return component;