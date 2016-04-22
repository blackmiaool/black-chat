let Provider=ReactRedux.Provider;
let Root=React.createClass({
    getInitialState:function(){
        let rootStore=(state={mode:"signup"},action)=>{                
            switch(action.type){
                case "setMode":
//                    state.mode=action.mode;
                    return Object.assign({},state,{mode:action.mode})
                    break;
                case "setHeadState":                        
                    state.headState=action.data;
                    break;
            }
            return state;
        }
        let store = Redux.createStore(rootStore);
//        store.subscribe(()=>{
//            this.setState({
//                headState:store.getState().headState
//            }); 
//
//        }) 
        return {store};
    },
    render:function(){
        return (
            <Provider store={this.state.store}>
            <div id="page-login" className="page">
               <div className="header-wrap">
                  <CommonHeader/> 
               </div>
                
                <div className="main">
                    <div className="center  page-max-width">
                        <div className="desc">
                            <h1>Just Chat Fucking Freely</h1>
                            <h3>Some people use BlackChat to build personal rooms.</h3>       
                        </div>
                        <div className="form-area">
                            <LoginForm/>
                            <RegisterForm />
                        </div>
                    </div>
                </div>                    
            </div>  
            </Provider>          
        );
    }
});
ReactDOM.render(
  <Root/>, 
  $("#wrap")[0]
);


