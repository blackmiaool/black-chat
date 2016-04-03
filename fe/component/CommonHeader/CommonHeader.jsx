define(function(){
    let component=React.createClass({
        render:function(){
            return (
                <div className="CommonHeader">
                    <div className="center page-max-width">
                        <a className="icon" href="javascript:window.location.origin"><img  src="/icon.png"/></a> 
                        <button className="nav-btn create">Create a room</button>
                        <div className="extend"></div>
                        <input type="text" className="room form-control" placeholder="Enter a room"/>
                        <button className="btn btn-default sign-in">Sign in</button>
                        <button className="btn btn-success sign-up">Sign up</button>
                        
                        
                    </div>
                </div>
            );
        }
    });
    return component;
})