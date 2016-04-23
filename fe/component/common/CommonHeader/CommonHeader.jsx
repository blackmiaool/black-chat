let Provider = ReactRedux.Provider;
let component = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        return (
            <div className="common-CommonHeader-component component">
                    <div className="center page-max-width">
                        <a className="icon" href="javascript:window.location.origin"><img  src="/icon.png"/></a> 
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
                                return [<button className="btn btn-default sign-in" key="1">Sign in</button>,
                        <button className="btn btn-success sign-up" key="2">Sign up</button>];
                            }
                        })()}
                        <ul className="dropdown-menu">
                            <li><a href="#">Profile</a></li>
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
return component;