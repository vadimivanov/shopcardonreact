var Login = React.createClass({
    onChange: function(e) {
        this.setState({
            username: e.target.value,
            password: e.target.value
        });
    },
    login : function (){
        var self = this,
            login = this.refs.username.getDOMNode().value,
            pass = this.refs.password.getDOMNode().value;

        Parse.User.logIn(login, pass, {
            success: function(user) {
                self.authSuccess();
            },
            error: function(user, error) {
                self.showError(error.message);
            }
        });
    },
    signUp : function (){
        var self = this,
            user = new Parse.User(),
            newUsername = this.refs.newUsername.getDOMNode().value,
            newPassword = this.refs.newPassword.getDOMNode().value;

        if (!newUsername.length || !newPassword.length) {
            this.showError('verify your credentials, please');
            return false;
        }

        user.set({
            "username": newUsername,
            "password": newPassword
        });

        user.signUp(null, {
            success: function(user) {
                self.authSuccess();
            },
            error: function(user, error) {
                self.showError(error.code + " " + error.message);
            }
        });
//        this.refs.newUsername.getDOMNode().value = '';
//        this.refs.newPassword.getDOMNode().value = '';
    },
    showError: function (error){
       PubSub.publish("alert.channel", {error: error});
    },
    authSuccess: function (){
        console.log('auth success');
        Router.navigate("AddCard");
    },
    render: function() {
        return (
            <div className='signin-component'>
                <h5 className='header'>Sign in form</h5>
                <div className="row">
                    <div>
                        <input ref="username" placeholder="login" />
                    </div>
                    <div>
                        <input ref="password" type="password" placeholder="password" />
                    </div>
                    <button onClick={this.login}>Sign in</button>
                </div>
                <h5 className='header topcoat-list__header'>Sign up form</h5>
                <div className="row">
                    <div>
                        <input ref="newUsername" placeholder="login" />
                    </div>
                    <div>
                        <input ref="newPassword" placeholder="password" />
                    </div>
                    <button onClick={this.signUp}>Sign up</button>
                </div>
            </div>
            );
    }
});