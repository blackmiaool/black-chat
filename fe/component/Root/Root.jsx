define(["common","RootHeader/","RootMain/"],function(common,RootHeader,RootMain){
    let Root=React.createClass({
        getInitialState:function(){
            let rootStore=(state={},action)=>{                
                switch(action.type){
                    case "setHeadState":                        
                        state.headState=action.data;
                        break;
                }
                return state;
            }
            let store = Redux.createStore(rootStore);
            store.subscribe(()=>{
                this.setState({
                    headState:store.getState().headState
                });
                
            })
            return {store:store,headState:"离线"};
        },
        render:function(){
            return (
                <div>
                    <RootHeader store={this.state.store} headState={this.state.headState}/>
                    <RootMain store={this.state.store}/>
                </div>            
            );
        }
    });
    ReactDOM.render(
      <Root/>, 
      $("#wrap")[0]
    );
})

