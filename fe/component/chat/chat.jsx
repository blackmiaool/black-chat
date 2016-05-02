let Provider = ReactRedux.Provider;
let Root = React.createClass({
    connectInit: function () {
        this.socket = new WebSocket(`ws://${location.host}/pipe/submit`);
        let socket = this.socket;
        socket.onopen = (event) => {
            
            this.state.store.dispatch({
                type: "setHeadState",
                state: "online",
            });
            socket.onmessage = (event) => {
                if (!event.data)
                    return;
                this.state.store.dispatch({
                    type: "receiveMessage",
                    text: event.data,
                });
                //                message.push(event.data)
                //                console.log(message); 
                //                this.setState({
                //                    message
                //                })
            };
            socket.onclose = (event) => {
                this.state.store.dispatch({
                    type: "setHeadState",
                    state: "offline",
                });
            };
        };
    },
    
    getInitialState: function () {
        let rootStore = (state = {
            current: "recent",
            currentRoom: {},
            rootList: [],
        }, action) => {
            switch (action.type) {
            case "initChatRooms":
                break;
            case "setHeadState":              
                return Object.assign({}, state, {
                    headState: action.state
                })
                break;
            case "setCurrentTab":
                return Object.assign({}, state, {
                    current: action.name
                })
                break;
            case "setRoom":
                console.log(action.room)
                return Object.assign({}, state, {
                    currentRoom: action.room
                })
                break;
            case "sendMessage":
                console.log(action)
                this.socket.send(action.text);
                break;
            case "receiveMessage":
                this.state.message.push({text:action.text})
                this.setState({
                    message:this.state.message
                })
                return state;
            }
            return state;
        }
        this.connectInit();

        let store = Redux.createStore(rootStore);

        return {
            message: [{text:"a"},{text:"b"} ],
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
                    <div className="top">
                        <Title/>   
                    </div>

                    <div className="left">
                        <ChatMessage message={this.state.message}/>
                        <Tools/>
                        <Input store={this.state.store}/>
                    </div>           
                    <div className="right">
                        <div className="Bulletin-wrap">
                           <Bulletin/>
                        </div>
                        <div className="members-wrap">
                            <Members/>                            
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