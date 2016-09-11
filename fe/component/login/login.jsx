import common from "../../client/common.js"
import React from "react";
import {
    Provider
}
from 'react-redux';
import * as Redux from 'redux';
import _ from 'underscore';
import CommonHeader from "../common/CommonHeader/CommonHeader";

import rootConfig from "../config.js";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
var css = require("./login.less");
let Root=React.createClass({
    getInitialState:function(){        
        let rootStore=(state={mode:common.args.mode?common.args.mode:"signup"},action)=>{             
            switch(action.type){
                case "setMode"://signup or signin
//                    state.mode=action.mode;
                    return Object.assign({},state,{mode:action.mode})
                    break;
                case "setHeadState":                        
                    state.headState=action.data;
                    break;
            }
            return state;
        }
        let store = Redux.createStore(rootStore);
//        store.subscribe(()=>{
//            this.setState({
//                headState:store.getState().headState
//            }); 
//
//        }) 
        return {store};
    },
    render:function(){
        return (
            <Provider store={this.state.store}>
            <div id="page-login" className="page">
               <div className="header-wrap">
                  <CommonHeader/> 
               </div>
                
                <div className="main">
                    <div className="center  page-max-width">
                        <div className="desc">
                            <h1>Just Chat Fucking Freely</h1>
                            <h3>Some people use BlackChat to build personal rooms.</h3>       
                        </div>
                        <div className="form-area">
                            <LoginForm/>
                            <RegisterForm />
                        </div>
                    </div>
                </div>                    
            </div>  
            </Provider>          
        );
    }
});

export default Root;

