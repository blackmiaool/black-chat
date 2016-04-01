define(function(){
    let LeftPanel=React.createClass({
        contextTypes: {
            col: React.PropTypes.any
        },
        render:function(){
            console.log("col",this.context);
            return (
                <div></div>
            );
        }
    });
    return LeftPanel;
})