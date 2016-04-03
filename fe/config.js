'use strict';
let pageConfig = {
    chat: {
        ChatRoot: {
            RootHeader: 1,
            RootMain: {
                'Tabs': 1,
                'Title': 1,
                'Menus': 1,
                'ChatMessage': 1,
                'Input': 1,
                'Info': 1,
                'LeftPanel': 1,
                'Tools': 1,
            },
        }
    },
    login: {
        LoginRoot: {
            CommonHeader:1,
            LoginForm:1,
            RegisterForm:1,
        }
    },
}
module.exports = {
    pageConfig
}