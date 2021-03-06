import common from "../../../client/common.js"
import React from "react";
import {Provider,connect} from 'react-redux';
import * as Redux from 'redux';
import $ from "jquery";
var css = require("./Input.less");
import ReactDOM from "react-dom";
const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = function(dispatch) {
    return {
        submit:function(text){
            dispatch({
                type:"sendMessage",
                text
            })
        }
    }
}
let component=React.createClass({
    getInitialState:function(){
         return {
            author: '',
            text: ''
        };
    },
     componentDidMount:function(){
        this.$dom=$(ReactDOM.findDOMNode(this));
    },
    update: function(event) {
        this.setState({
            text: event.target.value
        });
    },
    keyHandle:function(event){                
        if((event.ctrlKey&&event.key==="Enter")||
           (event.altKey&&event.keyCode===83)){//ctrl+enter and alt+s 
            this.props.submit(this.state.text);
        }
    },
    render:function(){
        return (
            <div className="chat-Input-component component">
                  <textarea className="input" name="" cols="30" rows="10" value={this.state.text} onChange={this.update} onKeyDown={this.keyHandle}></textarea>
                <div className="send-wrap">
                <button className="send clickable unselectable" onClick={this.props.submit.bind(this,this.state.text)}>
                发送&#40;<span className="underline">s</span>&#41;
                </button> 

                <span className="menu-head clickable">&nbsp;<span className="caret"></span></span>    
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

