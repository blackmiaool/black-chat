let Provider=ReactRedux.Provider;
let component=React.createClass({
    getInitialState:function(){
        return {
        };
    },
    render:function(){
        return (
            <div className="common-CommonHeader-component component">
                    <div className="center page-max-width">
                        <a className="icon" href="javascript:window.location.origin"><img  src="/icon.png"/></a> 
                        {(()=>{if(common.args.page!="chat"){
                            return <button className="nav-btn create">Create a room</button>
                        }})()}
                        
                        <div className="extend"></div>
                        <input type="text" className="room form-control" placeholder="Enter a room"/>
                        
                        <button className="btn btn-default sign-in">Sign in</button>
                        <button className="btn btn-success sign-up">Sign up</button>
                        
                        
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

