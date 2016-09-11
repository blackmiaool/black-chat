import common from "../../client/common.js"
import React from "react";
import {
    Provider
}
from 'react-redux';
import * as Redux from 'redux';
import _ from 'underscore';
import CommonHeader from "../common/CommonHeader/CommonHeader";
import LeftHeader from "../chat/LeftHeader/LeftHeader";
import RoomList from "../chat/RoomList/RoomList";
import Title from "../chat/Title/Title";
import ChatMessage from "../chat/ChatMessage/ChatMessage";
import Tools from "../chat/Tools/Tools";
import Input from "../chat/Input/Input";
import Bulletin from "../chat/Bulletin/Bulletin";
import Members from "../chat/Members/Members";
import rootConfig from "../config.js"

let css = require("./chat.less");
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
        start(rootConfig.wsLocation);

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
                    console.log(action.room.uid)
                this.setState({
                    roomId:action.room.uid
                })
                console.log(this.state.roomId,"roomid");
                return Object.assign({}, state, {
                    currentRoom: action.room,
                    roomId:action.room.uid
                })
                break;
            case "sendMessage":  
                    console.log("uid",state.currentRoom.uid)
                this.socket.send(JSON.stringify({
                    content: action.text,
                    room: state.currentRoom.uid
                }));
                break;
            case "receiveMessage":
                    
                if(this.state.message[action.data.room]===undefined){
                    this.state.message[action.data.room]=[];
                }
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
                        <ChatMessage message={this.state.message[this.state.roomId]}/>
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
export default Root;
                    
//                </div>