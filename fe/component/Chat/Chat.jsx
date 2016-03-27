define(["common"], function(common) {
    let $$;
     
    function checkScroll(){
        
    }
    let Chat = React.createClass({
        getInitialState: function() {
            
            return {};
        },
        componentDidMount:function(){
            this.$dom=$(ReactDOM.findDOMNode(this));
            $$=this.$dom.find.bind(this.$dom);

        },
        handleMessage:function(messages){
            return messages.map((v,i)=>{
                return <div key={i} className="message">{v}</div>                        
            });
        },
        render: function() {
            return (
                <div className="Chat-area">
                <div className="message-wrap">
                    {this.handleMessage(this.props.message)}
                </div>                
                </div>
            );
        }
    });
    return Chat;
})