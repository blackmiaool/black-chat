let Provider=ReactRedux.Provider;
const mapStateToProps = function(state)  {
  return {
      mode:state.mode 
  }
}
const mapDispatchToProps = function(dispatch){
  return {
      changeMode:function(mode){
          dispatch({type:"setMode",mode});
      }
  }
}
let component=React.createClass({
    getInitialState:function(){
//        let stateStore = function(state, action) {
//            switch (action.type) {
//            }
//        }
//
//        let store = Redux.createStore(stateStore);
//        return {
//            store,
//        };
        return {};
    },
    toggleMode:function(){
        if(this.props.mode=="signin"){
            this.props.changeMode("signup");
        }else{
            this.props.changeMode("signin");
        }
    },
    getBottomText:function(){
        if(this.props.mode=="signin"){
            return "or Sign up";
        }else{            
            return "or Sign in";
        }        
    },
    getButtonText:function(){
        if(this.props.mode=="signin"){
            return "Sign up for BlackChat";
        }else{            
            return "Sign in for BlackChat";
        }
    },
    handleChangeInvite:function(event){
        console.log(event.target.value)
        this.setState({invite: event.target.value});
    }, 
    render:function(){
        let root=this;
        return (
              <form className="login-LoginForm-component component" data-mode={this.props.mode}>
                <input name="invite-code" type="text" className="form-control" placeholder="Invite code (if have)" onChange={this.handleChangeInvite} value={this.state.invite}/>  
                <input name="name" type="text" className="form-control" placeholder="User name" onChange={this.handleChange}/>       
                <input name="passwd" type="password" className="form-control" placeholder="Password" onChange={this.handleChange}/> 
                <input name="passwd-again" type="password" className="form-control" placeholder="Password again" onChange={this.handleChange}/>   
                <input name="submit" className={this.state.mode} value={this.getButtonText()} readOnly/>
                <a href="javascript:void(0)" onClick={this.toggleMode}>{this.getBottomText()}</a> 
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

component=ReactRedux.connect(mapStateToProps,mapDispatchToProps)(component);
return component;

