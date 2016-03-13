define("RootMain",['Tabs','Title','Menus','Chat','Input','Info'],function(Tabs,Title,Menus,Chat,Input,Info){
    let RootMain=React.createClass({
        render:function(){
            return (
                <div>
                   <Tabs/>
                    <Title/>                    
                    <Menus/>
                    <Chat/>
                    <Input/>
                    <Info/>
                </div>
            );
        }
    });
    return RootMain;
})