import React from 'react';
import {render} from 'react-dom';
import App2 from "./app2";
import Root from "../component/chat"
//console.log(chat)
class App extends React.Component {
  render () {
    return <Root/>;
  }
}
render(<App/>, document.getElementById('app'));
