let Provider = ReactRedux.Provider;
let Root = React.createClass({
    getInitialState: function () {
        let rootStore = (state = {
            chatTab: "recent",
            rootList:{
                recent:[],
                friend:[],
                group:[],
            }
        }, action) => {
            switch (action.type) {
            case "initChatRooms":
                break;
            case "setHeadState":
                return Object.assign({}, state, {
                    headState: action.state
                })
                break;
            case "setChatTab":
                return Object.assign({}, state, {
                    chatTab: action.name
                })
                break;
            }
            return state;
        }
        let store = Redux.createStore(rootStore);
        
        return {
            store, headState: "offline"
        };
    },
    render: function () {
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