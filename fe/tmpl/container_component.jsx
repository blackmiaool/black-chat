let Provider = ReactRedux.Provider;
const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = function (dispatch) {
    return {}
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
        return (
            <Provider  store={this.state.store}>
            <div className="{{page}}-{{name}}-component component">
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

component = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(component);
return component;