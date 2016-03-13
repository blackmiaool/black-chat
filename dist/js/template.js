//var header=React.createClass({
//    render:function(){
//        return (
//            
//        );
//    }
//});
var Header=React.createClass({displayName: "Header",
    render:function(){
        return (
            React.createElement("div", null)
        );
    }
});
var Main=React.createClass({displayName: "Main",
    render:function(){
        return (
            React.createElement("div", null)
        );
    }
});
var Root=React.createClass({displayName: "Root",
    render:function(){
        return (
            React.createElement("div", null, 
                React.createElement(Header, null), 
                React.createElement(Main, null)
            )            
        );
    }
});
//var Root = React.createClass({
//  render: function() {
//    return (
//        <header></header>
//        <body></body>        
//    );
//  }
//});
ReactDOM.render(
  React.createElement(Root, null),
  $("#wrap")[0]
);