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
        console.log('login form', login, pass);

        Parse.User.logIn(login, pass, {
            success: function(user) {
                console.log('login success',user);
                self.authSuccess();
            },
            error: function(user, error) {
                console.log('login error', user, error);
                self.showError(error.message);
            }
        });
    },
    signUp : function (){
        var self = this,
            user = new Parse.User(),
            newUsername = this.refs.newUsername.getDOMNode().value,
            newPassword = this.refs.newPassword.getDOMNode().value;

        if (!newUsername.length || !newPassword.length /*|| !email*/) {
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
    },
    showError: function (error){
        alert(error);
    },
    authSuccess: function (){
        console.log('auth success');
        Router.navigate("AddCard");
    },
    render: function() {
        return (
            <div>
                <h3 className='header topcoat-list__header'>Sign in form</h3>
                <form>
                    <input ref="username" placeholder="login" />
                    <input ref="password" placeholder="password" />
                    <button onClick={this.login}>Sign in</button>
                </form>
                <h3 className='header topcoat-list__header'>Sign up form</h3>
                <form>
                    <input ref="newUsername" placeholder="login" />
                    <input ref="newPassword" placeholder="password" />
                    <button onClick={this.signUp}>Sign up</button>
                </form>
            </div>
            );
    }
});