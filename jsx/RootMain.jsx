define("RootMain", ['Tabs', 'Title', 'Menus', 'Chat', 'Input', 'Info', 'LeftPanel','Tools'], function(Tabs, Title, Menus, Chat, Input, Info, LeftPanel,Tools) {
    let RootMain = React.createClass({
        getInitialState: function() {

            var socket = new WebSocket(`ws://${location.host}/pipe/submit`);
            this.socket = socket;
            let message=["a","b"];
            socket.onopen = (event) => {
                this.props.store.dispatch({
                    type: "setHeadState",
                    data: "online",
                })
//                socket.send("")
                socket.onmessage = (event)=> {
//                    console.log('Client received a message', event);
//                    console.log(message)
                    if(!event.data)
                        return;
                    message.push(event.data)
                    this.setState({
                        message
                    })
                    
                };
                socket.onclose = (event) => {
                    console.log('Client notified socket has closed', event);
                    this.props.store.dispatch({
                        type: "setHeadState",
                        data: "offline",
                    })
                };
            };
            let coreStore = function(state, action) {
                switch (action.type) {
                    case "sendMessage":
                        socket.send(action.data);
                        break;
                }
            }
            
            let store = Redux.createStore(coreStore);
            return {
                author: '',
                text: '',
                store,
                message
            };
        },
        render: function() {
            return (
                <div className="root-main-area">                   
                    <LeftPanel className="left"/>                    
                    <div className="right">
                        <Tabs/>
                        <Title/>                                       
                        <Menus/>
                        <Chat message={this.state.message}/>
                        <Tools/>
                        <Input store={this.state.store}/>
                    </div>                    
                    <Info/>
                </div>
            );
        }
    });
    return RootMain;
})