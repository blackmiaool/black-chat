import common from "../../../client/common.js"
import React from "react";
import {Provider,connect} from 'react-redux';
import * as Redux from 'redux';
import _ from "underscore";

var css = require("./Members.less");
const mapStateToProps = (state) => {
    return {
        members: state.currentRoom.members||{},
    }
}
const mapDispatchToProps = function (dispatch) {
    return {}
}

let component = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        return (
            <div className="chat-Members-component component">
                <div className="title">Members 
                    <span className="cnt"></span>
                </div>
                <div className="members">
                    {_.map(this.props.members,(function(v,i){
                        return (
                    <div className="member" key={i}>
                        <div className="avatar-wrap">
                            <img src={v.icon} alt="User avatar" className="avatar"/>                                
                        </div>
                        <span className="name" title={v.name}>{v.name}</span> 
                    </div>)
                    }).bind(this))} 
                </div>
                                              
            </div>
        );
    },
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
    //    componentWillUnmount:function(){
    //        
    //    }    
});
component=connect(mapStateToProps,mapDispatchToProps)(component);
export default component;