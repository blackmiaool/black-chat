import React from 'react';
import {render} from 'react-dom';
import Root from "../component/chat/chat"
//console.log(chat)
var css = require("../less/base.less");
import {
    Router,
    Route,
    hashHistory
} from 'react-router'
class App extends React.Component {
  render () {
    return <Root/>;
  }
}
render(<App/>, document.getElementById('app'));
