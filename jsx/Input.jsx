define("Input",["common"],function(common){
    let Input=React.createClass({
        getInitialState: ()=> {
            console.log(this);
            return {author: '', text: ''};
        },
        update:function(event){            
            this.setState({text: event.target.value});
        },
        submit:function(){
            console.log(this)
            console.log("mm");
            $.ajax({
                type: 'POST',
                url: "http://localhost:9999/pipe/submit",
                data: {data:this.state.text},
                //                dataType: "json",
                timeout: 5000,
                success: function (response) {
                    pre_data_handle(response);

                },
                error: function (response) {
                    console.log(response);
                    //                    pre_data_handle(response);                   
                },
            });
        },
        render:function(){
            return (
                <div>
                    <textarea name="" cols="30" rows="10" value={this.state.text} onChange={this.update}></textarea>
                    <button onClick={this.submit}>提交</button>
                </div>
            );
        }
    });
    return Input;
})