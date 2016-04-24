const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = function (dispatch) {
    return {
        setRoom:function(room){
            dispatch({type:"setRoom",room})
        }
    }
}
let component = React.createClass({
    getInitialState: function () {
        let stateStore = function (state, action) {
            switch (action.type) {}
        }

        let store = Redux.createStore(stateStore);
        return {
            store,
        };
    },
    render: function () {
        return (<div className="chat-Room-component component" data-checked={this.props.checked} onClick={this.props.setRoom.bind(this,this.props.room)}>
            <span className="round-close glyphicon glyphicon-remove"></span>
            <div className="icon">
                <img src={this.props.icon.url} alt="" className="icon-img"/>
            </div>
            <label className="name">{this.props.name}</label>
            <div className="message-cnt"></div>
            </div>);
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