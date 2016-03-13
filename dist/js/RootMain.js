'use strict';

define("RootMain", ['Tabs', 'Title', 'Menus', 'Chat', 'Input', 'Info'], function (Tabs, Title, Menus, Chat, Input, Info) {
    var RootMain = React.createClass({ displayName: "RootMain",
        render: function render() {
            return React.createElement("div", null, React.createElement(Tabs, null), React.createElement(Title, null), React.createElement(Menus, null), React.createElement(Chat, null), React.createElement(Input, null), React.createElement(Info, null));
        }
    });
    return RootMain;
});