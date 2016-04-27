let Provider = ReactRedux.Provider;
const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = function(dispatch) {
    return {
        setHeadState: function(state) {
            dispatch({
                type: "setHeadState",
                state
            });
        },
    }
}
let component = React.createClass({
    getInitialState: function() {
        this.socket = new WebSocket(`ws://${location.host}/pipe/submit`);
        let socket = this.socket;
        let message = ["a", "b"];
        socket.onopen = (event) => {
            this.props.setHeadState("online");
            //                socket.send("")
            socket.onmessage = (event) => {
                //                    console.log('Client received a message', event);
                //                    console.log(message)
                if (!event.data)
                    return;
                message.push(event.data)
                this.setState({
                    message
                })

            };
            socket.onclose = (event) => {
                console.log('Client notified socket has closed', event);
                this.props.setHeadState("offline");
            };
        };

        let stateStore = function(state, action) {
            switch (action.type) {
                case "sendMessage":
                    socket.send(action.data);
                    break;
            }
        }

        let store = Redux.createStore(stateStore);
        return {
            author: '',
            text: '',
            store,
            message
        };
    },
    sendMessage: function(data) {
        console.log(data.text)
        this.state.store.dispatch({
            type: "sendMessage",
            data: data.text
        });
    },
    render: function() {
        return (
            <Provider  store={this.state.store}>
            <div className="chat-RootMain-component component"> 
                 <div className="top">
                  <Title/>   
                 </div>
                  
                   <div className="left">
                       <ChatMessage message={this.state.message}/>
                    <Tools/>
                    <Input store={this.state.store} submit={this.sendMessage}/>
                   </div>           
                   <div className="right">
                     <div className="Bulletin-wrap">
                         <Bulletin/>
                     </div>
                      
                       <Members/>
                        
                   </div>                    
            </div>
            </Provider>
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

component = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(component);
return component;