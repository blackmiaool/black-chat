let Provider=ReactRedux.Provider;
let component=React.createClass({
    getInitialState:function(){
            let rootStore=(state={},action)=>{                
                return state;
            }
            let store = Redux.createStore(rootStore);
            store.subscribe(()=>{
                this.setState({
                    headState:store.getState().headState
                });
                
            })
            return {store:store};
    },
    render:function(){
        return (
            <form className="login-LoginForm-component component">
                <input type="text" className="form-control" placeholder="Invite code (if have)"/>  
                <input type="text" className="form-control" placeholder="User name"/>       
                <input type="password" className="form-control" placeholder="Password"/> 
                <input type="password" className="form-control" placeholder="Password again"/>   
                <button className="btn btn-success">Sign up for BlackChat</button><a href="javascript:void(0)">or Sign in</a> 
            </form>
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
return component;

