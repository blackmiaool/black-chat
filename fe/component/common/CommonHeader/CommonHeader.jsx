import common from "../../../client/common.js"
import React from "react";
import {Provider,connect} from 'react-redux';
import * as Redux from 'redux';
//import _ from 'underscore';

//require("css!less!./CommonHeader.less");
var css = require("./CommonHeader.less");

const mapStateToProps = function (state) {
    return {

    }
}
const mapDispatchToProps = function (dispatch) {
    let sign;
    if (common.args.page == "login") {
        sign=function(mode){
            dispatch({type:"setMode",mode})
        }
    } else {
        sign=function(mode){
            common.changePage("login",{mode});
        }
    }
    return {
        sign
    }
}
let component = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        return (
            <div data-component="common-commonHeader" className="component">
                    <div className="center page-max-width">
                        <a className="icon" href={window.location.origin}><img  src="/icon.png"/></a> 
                        {(()=>{if(common.args.page!="chat"){
                            return <button className="nav-btn create">Create a room</button>
                        }})()}
                        
                        <div className="extend"></div>
                        <input type="text" className="room form-control" placeholder="Enter a room"/>
                        {(()=>{
                            if(common.getCookie("userNameJs")){
                                return <span className="userNameWrap">
                                   Hi, 
                                    <label className="userName">{common.getCookie("userNameJs")}</label>
                                    <span className="arrow"></span>
                                    </span>
                                
                            }else{
                                return [<button className="btn btn-default sign-in" key="1" onClick={this.props.sign.bind(this,"signin")}>Sign in</button>,
                        <button className="btn btn-success sign-up" key="2" onClick={this.props.sign.bind(this,"signup")}>Sign up</button>];
                            }
                        })()}
                        <ul className="dropdown-menu">
                            <li className="hide"><a href="#">Profile</a></li>
                            <li><a href={`${location.origin}/logout?url=${encodeURIComponent(location.href)}`}>Log out</a></li>
                        </ul>
                        
                        
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
component = connect(mapStateToProps, mapDispatchToProps)(component);
export default component;