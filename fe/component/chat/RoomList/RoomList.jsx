let Provider = ReactRedux.Provider;
const mapStateToProps = (state) => {
    return {
        currentRoom:state.currentRoom
    }
}
const mapDispatchToProps = function (dispatch) {
    return {
        setRoom: function (room) {
            dispatch({
                type: "setRoom",
                room
            })
        }
    }
}
let component = React.createClass({
    getRoom: function () {
        $.post("/pipe/getRoom", function (data) {
            data = JSON.parse(data);
//            console.log(data);
            this.setState({
                roomList: data
            });
            if (!this.firstGetRooms) {
                this.firstGetRooms = true;
                this.state.store.dispatch({
                    type: "setRoom",
                    room: this.state.roomList[0]
                })
            }else{
                this.state.store.dispatch({
                    type: "setRoom",
                    room: data[this.props.currentRoom.uid]
                })
                
            }

        }.bind(this))
    },
    getInitialState: function () {
        let stateStore = function (state = {}, action) {
            switch (action.type) {
            case "setRoom":
                this.setState({
                    currentRoom: action.room
                });
                this.props.setRoom(action.room)
                    //                    for(var i in this.state.roomList){
                    //                        roomList[i];
                    //                    }
                break;
            }
        }.bind(this)
        this.getRoom();
        setInterval((function () {
            this.getRoom();
        }).bind(this), 1000)
        let store = Redux.createStore(stateStore);

        return {
            store,
            roomList: []
        };
    },
    handleChangeSearch: function (event) {
        this.state.search = event.target.value;
    },
    render: function () {
        let _this = this;       
        return (
            <Provider  store={this.state.store}>
            <div className="chat-RoomList-component component">
                <div className="header">
                   <div className="input-wrap">

                      <input type="text" onChange={this.handleChangeSearch} value={this.state.search}/> 
                      <span className="glyphicon glyphicon-search"></span>
                   </div>

                </div>
                <div className="body">                
                {this.state.roomList.map(function(room,i){
                        return <Room icon={room.icon} name={room.name} key={i} index={i} room={room}  checked={_this.state.currentRoom==room}/>
                    })}
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