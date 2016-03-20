define("Chat", ["common"], function(common) {
    let Chat = React.createClass({

        render: function() {
            return (
                <div className="Chat-area">
                {this.props.message.map((v,i)=>{
                        return <p key={i}>{v}</p>                        
                    })}
                </div>
            );
        }
    });
    return Chat;
})