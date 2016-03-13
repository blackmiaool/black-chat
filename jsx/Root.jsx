//var header=React.createClass({
//    render:function(){
//        return (
//            
//        );
//    }
//});
define("Root",["RootHeader","RootMain"],function(RootHeader,RootMain){
    let Root=React.createClass({
        render:function(){
            return (
                <div>
                    <RootHeader/>
                    <RootMain/>
                </div>            
            );
        }
    });
    ReactDOM.render(
      <Root/>, 
      $("#wrap")[0]
    );
})

