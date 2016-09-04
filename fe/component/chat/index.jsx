import common from "../../client/common.js"
import React from "react";
import {Provider} from 'react-redux';
import * as Redux from 'redux';
import _ from 'underscore';
import CommonHeader from "../common/CommonHeader/CommonHeader"
let Root = React.createClass({
    connectInit: function () {
        //        this.socket = new WebSocket(`ws://${location.host}/pipe/submit`);
        let socket;

        let start = (websocketServerLocation) => {
            socket = new WebSocket(websocketServerLocation);
            this.socket = socket;
            socket.onclose = (event) => {
                setTimeout(function () {
                    start(websocketServerLocation)
                }, 5000);
                this.state.store.dispatch({
                    type: "setHeadState",
                    state: "offline",
                });
            };
            socket.onopen = (event) => {

                this.state.store.dispatch({
                    type: "setHeadState",
                    state: "online",
                });
            };
            socket.onmessage = (event) => {
                if (!event.data)
                    return;
                this.state.store.dispatch({
                    type: "receiveMessage",
                    data: JSON.parse(event.data),
                });
            };
        }
        start(`ws://${location.host}/pipe/submit`);

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
                //                console.log(action.room)
                this.state.roomId = action.room.uid;
                //                console.log("roomId",this.state.roomId)
                this.setState(this.state)
                return Object.assign({}, state, {
                    currentRoom: action.room
                })
                break;
            case "sendMessage":
                console.log(action)

                this.socket.send(JSON.stringify({
                    content: action.text,
                    room: state.currentRoom.uid
                }));
                break;
            case "receiveMessage":
                this.state.message[action.data.room].push({
                    text: action.data.content,
                    user: state.currentRoom.members[action.data.user]
                })
                this.setState({
                    message: this.state.message
                })
                return state;
            }
            return state;
        }
        this.connectInit();

        let store = Redux.createStore(rootStore);

        return {
            message: [[]],
            store,
            headState: "offline"
        };
    },
    render: function () {
        //        return null;
        return (
            <Provider store={this.state.store}>            
            <div className="chat-root">
                    <div className="header-wrap">
                    <CommonHeader/> 
                </div>                   
            </div>  
            </Provider>
        );
    }
});
export default Root;
//ReactDOM.render(
//    <Root/>,
//    $("#wrap")[0]
//);
//                <div className="header-wrap">
//                    <CommonHeader/> 
//                </div>
//                <div className="left">
//                    <LeftHeader/> 
//                </div>
//                <div className="center">
//                    <RoomList/>  
//                </div>
//                <div className="right">
//                    <div className="top">
//                        <Title/>   
//                    </div>
//
//                    <div className="left">
//                        <ChatMessage message={this.state.message[this.state.roomId]}/>
//                        <Tools/>
//                        <Input store={this.state.store}/>
//                    </div>           
//                    <div className="right">
//                        <div className="Bulletin-wrap">
//                           <Bulletin/>
//                        </div>
//                        <div className="members-wrap">
//                            <Members/>                            
//                        </div>                                          
//                    </div>                    
//                </div>