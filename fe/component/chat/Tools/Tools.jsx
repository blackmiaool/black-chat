import common from "../../../client/common.js"
import React from "react";
import {Provider,connect} from 'react-redux';
import * as Redux from 'redux';

var css = require("./Tools.less");
//let Provider=ReactRedux.Provider;
let component=React.createClass({
    getInitialState:function(){
        return {
        };
    },
    render:function(){
        return (
            <div className="chat-Tools-component component">
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
//component=connect(mapStateToProps,mapDispatchToProps)(component);
export default component;

