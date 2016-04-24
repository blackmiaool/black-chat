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
      },
      submit:function(){
          dispatch({type:"submit"});
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
        return {
            showError:0
        }; 
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
            return "Sign in for BlackChat";
        }else{            
            return "Sign up for BlackChat";
        }
    },
    handleChangeInvite:function(event){
        this.setState({invite: event.target.value});
    }, 
    handleUserName:function(event){
        this.setState({userName: event.target.value});
    }, 
    handlePasswd:function(event){
        this.setState({passwd: event.target.value});
    }, 
    handlePasswdAgain:function(event){
//        console.log(event.target.value)
        this.setState({passwdAgain: event.target.value});
    }, 
    submit:function(e){
        e.preventDefault();
        this.setState({errorMessage:"",showError:0})
        
        if(this.props.mode=="signin"){
            let data2post={
                userName:this.state.userName,
                passwd:this.state.passwd,                
            }
            $.post("/pipe/signin",data2post,function(data){
                data=JSON.parse(data);
                if(data.code==0){
                    common.changePage("chat");
                }else{
                    this.setState({errorMessage:data.msg,showError:1})
                }
            }.bind(this))
        }else{
            let data2post={
                invite:this.state.invite,
                userName:this.state.userName,
                passwd:this.state.passwd,                
            }
            if(this.state.passwd!=this.state.passwdAgain){
                this.setState({errorMessage:"Password not same.",showError:1});
                return;
            }
            $.post("/pipe/signup",data2post,function(data){
                data=JSON.parse(data);
                if(data.code==0){
                   common.changePage("chat");
                }else{
                    this.setState({errorMessage:data.msg,showError:1})
                }
            }.bind(this))
        }
        
        this.props.submit();
    },                     
    render:function(){
        let root=this;
        return (
            <form className="login-LoginForm-component component" data-mode={this.props.mode} onSubmit={this.submit}>
               <input name="invite-code" type="text" className="form-control" placeholder="Invite code (if have)" onChange={this.handleChangeInvite} value={this.state.invite}/>

                <input name="account" type="text" className="form-control" placeholder="User name" onChange={this.handleUserName} value={this.state.userName}/>       
                <input name="passwd" type="password" className="form-control" placeholder="Password" onChange={this.handlePasswd} value={this.state.passwd}/> 
                <input name="passwd-again" type="password" className="form-control" placeholder="Password again" onChange={this.handlePasswdAgain} value={this.state.passwdAgain}/>
                <div className="alert alert-danger" role="alert" data-show={this.state.showError}>
                  {this.state.errorMessage}
                </div>
                <input name="submit" type="submit" className={this.state.mode} value={this.getButtonText()} readOnly/>
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

