import React from 'react';
import {render} from 'react-dom';
import Chat from "../component/chat/chat";
import Login from "../component/login/login";
//console.log(chat)
var css = require("../less/base.less");

import {
    Router,
    Route,
    hashHistory
} from 'react-router'


class App extends React.Component {
  render () {
      return (<Router history={hashHistory} >
      <Route path="/" component={Chat}/>
       <Route path="/chat" component={Chat}/>
       <Route path="/login" component={Login}/>
      </Router>);
  }
}
render(<App/>, document.getElementById('app'));
