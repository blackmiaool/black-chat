define(["common","LoginForm/","RegisterForm/","CommonHeader/"],function(common,LoginForm,RegisterForm,CommonHeader){
    let Root=React.createClass({
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
                <div id="page-login" className="page">
                    <CommonHeader store={this.state.store}/>
                    <div className="main">
                        <div className="center  page-max-width">
                            <div className="desc">
                                <h1>Just Chat Fucking Freely</h1>
                                <h3>Some people use BlackChat to build personal rooms.</h3>       
                            </div>
                            <div className="form-area">
                                <LoginForm store={this.state.store}/>
                                <RegisterForm store={this.state.store}/>
                            </div>
                        </div>
                    </div>                    
                </div>            
            );
        }
    });
    ReactDOM.render(
      <Root/>, 
      $("#wrap")[0]
    );
})

