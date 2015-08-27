var App = React.createClass({

    getInitialState: function () {
        return {
            currentView: "Login",
            startRout: "Login",
            params: null
        };
    },

    componentDidMount: function () {
        var self = this;

        PubSub.subscribe('main.channel', function (channel, message) {
            self.setState({
                currentView: message.currentView,
                params: message.params
            });
        });
        console.log('app.initialRoute',app);
        Router.navigate(this.state.startRout);
    },

    render: function () {
        var frames = {
            AddCard: <AddCard />,
            Login: <Login />
        },
        viewNodes = frames[this.state.currentView];

        return (
            <div className='main-wrapper'>
                <div className='main-frame'>
                    {viewNodes}
                </div>
                <CustomAlert />
            </div>
            );
    }
});

React.render(
    <App />, document.getElementById('screen')
);