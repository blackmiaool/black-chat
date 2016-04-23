let Provider = ReactRedux.Provider;
let Root = React.createClass({
    getInitialState: function () {
        let stateStore = function (state, action) {
            switch (action.type) {}
        }

        let store = Redux.createStore(stateStore);
        common.delCookie("userNameJs");
        common.delCookie("token");
        common.delCookie("userName");
        location.replace(decodeURIComponent(common.args.url));
        
        return {
            store,
        };
    },
    render: function () {
        return (
            <Provider store={this.state.store}>
            <div id="page-logout" className="page">                   
            </div>  
            </Provider>
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
ReactDOM.render(
    <Root/>,
    $("#wrap")[0]
);