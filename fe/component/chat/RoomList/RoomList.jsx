import common from "../../../client/common.js"
import React from "react";
import {Provider,connect} from 'react-redux';
import $ from "jquery"
import Room from "../Room/Room"
import rootConfig from "../../config.js"

var css = require("./RoomList.less");
const mapStateToProps = (state) => {    
    return {
        currentRoom:state.currentRoom
    }
}
const mapDispatchToProps = function (dispatch) {
    return {
        setRoom: function (room) {
            dispatch({
                type: "setRoom",
                room
            })
        }
    }
}
let component = React.createClass({
    getRoom: function () {
        $.post(rootConfig.url.getRoom, function (data) {
            data = JSON.parse(data);
            this.setState({
                roomList: data
            });
            if (!this.firstGetRooms) {
                this.firstGetRooms = true;
                this.setState({
                    currentRoom:this.state.roomList[0],
                });
            }else{      
                this.setState({
                    currentRoom:data[this.props.currentRoom.uid],
                });             
            }

        }.bind(this))
    },
    getInitialState: function () {

        this.getRoom();
        let getRoomInterval=setInterval((function () {
            this.getRoom();
        }).bind(this), 1000)
        return {
            roomList: [],
            getRoomInterval,
        };
    },
    handleChangeSearch: function (event) {
        this.state.search = event.target.value;
    },
    render: function () {
        let _this = this;       
        return (
            <div className="chat-RoomList-component component">
                <div className="header">
                   <div className="input-wrap">

                      <input type="text" onChange={this.handleChangeSearch} value={this.state.search}/> 
                      <span className="glyphicon glyphicon-search"></span>
                   </div>

                </div>
                <div className="body">                
                {this.state.roomList.map(function(room,i){
                        return <Room icon={room.icon} name={room.name} key={i} index={i} room={room}  checked={_this.props.currentRoom.uid==room.uid}/>
                    })}
                </div>
            </div>
        );
    },
    componentWillUnmount:function(){
        if(this.state.getRoomInterval){
            clearInterval(this.state.getRoomInterval);
        }
    }
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
            
});
component = connect(mapStateToProps, mapDispatchToProps)(component);
export default component;