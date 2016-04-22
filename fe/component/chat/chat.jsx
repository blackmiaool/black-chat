let Provider=ReactRedux.Provider;
let Root=React.createClass({
    getInitialState:function(){
        let rootStore=(state={},action)=>{              
            switch(action.type){
                case "setHeadState":
//                    this.state.headState=action.state;
//                    this.setState()
                    return Object.assign({},state,{headState:action.state})
                    break;
                case "setChatTab":
                    console.log(action.name)
                    return Object.assign({},state,{chatTab:action.name})
                    break;
            }
            return state;
        }
        let store = Redux.createStore(rootStore);

//        store.subscribe(function(){
//            this.setState({
//                headState:store.getState().headState
//            });
//            console.log(store.getState().headState)
//
//        })
        return {store,headState:"offline"};
    },
    render:function(){
        return (
            <Provider store={this.state.store}>
            
            <div className="chat-root">
              <div className="header-wrap">
                  <CommonHeader/> 
               </div>
               <div className="left">
                   <LeftHeader/> 
               </div>
               <div className="center">
                   <RoomList/>  
               </div>
               <div className="right">
                   <RootMain/>
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


