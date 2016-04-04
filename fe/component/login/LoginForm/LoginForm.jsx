
    let LeftPanel=React.createClass({
        getInitialState:function(){
            let rootStore=(state={},action)=>{                
                return state;
            }
            let store = Redux.createStore(rootStore);
            store.subscribe(()=>{
                this.setState({
                    headState:store.getState().headState
                });
                
            })
            return {store:store};
        },
        render:function(){
            return (
                <form className="component-LoginForm">
                    <input type="text" className="form-control" placeholder="Invite code (if have)"/>  
                    <input type="text" className="form-control" placeholder="User name"/>       
                    <input type="password" className="form-control" placeholder="Password"/> 
                    <input type="password" className="form-control" placeholder="Password again"/>   
                    <button className="btn btn-success">Sign up for BlackChat</button><a href="javascript:void(0)">or Sign in</a> 
                </form>
            );
        }
    });
    return LeftPanel;
