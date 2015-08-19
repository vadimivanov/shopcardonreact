var Login = React.createClass({
    login: function(e) {
        Router.navigate("AddCard");
        console.log('click login');
    },
    onChange: function(e) {
        this.setState({text: e.target.value});
    },
    render: function() {
        return (
            <div>
                <h3 className='topcoat-list__header'>Login</h3>
                <form>
                    <input onChange={this.onChange} />
                    <button onClick={this.login}>Sign in</button>
                </form>
            </div>
            );
    }
});