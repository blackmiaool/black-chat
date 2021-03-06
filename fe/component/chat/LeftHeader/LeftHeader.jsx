import common from "../../../client/common.js"
import React from "react";
import {Provider,connect} from 'react-redux';

var css = require("./LeftHeader.less");
const mapStateToProps = (state) => {
//    console.log(state);
    return {state:state.headState,currentTab:state.current}
}
const mapDispatchToProps = function(dispatch) {
    return {
        setCurrentTab:function(name){
            dispatch({type:"setCurrentTab",name})
        }
    }
}

let component = React.createClass({
    getInitialState: function() {

        return {};
    },

    render: function() {
        return (
            <div data-component="chat-leftHeader" className=" component">
            <div className="avatar-area">
                <div className="connection-state" data-state={this.props.state} title={this.props.state}>
                    
                </div>
            </div>
            <div className="group-area">                
                <span className="glyphicon glyphicon-comment" data-state={this.props.currentTab=="recent"&&1} onClick={this.props.setCurrentTab.bind(this,"recent")}></span>
                <span className="glyphicon glyphicon-user" data-state={this.props.currentTab=="friend"&&1} onClick={this.props.setCurrentTab.bind(this,"friend")}></span>
                <span className="glyphicon glyphicon-home" data-state={this.props.currentTab=="group"&&1} onClick={this.props.setCurrentTab.bind(this,"group")}></span>
            </div>
            <div className="tools-area"></div>
            </div>
        ); 
    },
//    getDefaultProps:function(){
//      return {currentTab:"recent"}
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