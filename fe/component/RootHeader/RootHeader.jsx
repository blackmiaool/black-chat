define(function(){
    var RootHeader={};    
    RootHeader=React.createClass({
        getInitialState:function(){
           
            return {};
        },
        setHeadText:function(){
          
        },
        setParentStore:function(store){

        },
        render:function(store){
            this.setParentStore(this.props.store);
            return (
                <div className="root-header">                          
                    {this.props.headState=="online"?"在线":"离线"}
                </div>
            );
        }
    });
    return RootHeader;
})

    

