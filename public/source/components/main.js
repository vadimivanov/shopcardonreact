var App = React.createClass({

    getInitialState: function () {
        'use strict';
//        var initialRouteSplat = app.initialRoute.split('/');

        return {
            currentView: "Login",
            params: null
        };
    },

    componentDidMount: function () {
        'use strict';
        var self = this;
        PubSub.subscribe('main.channel', function (channel, message) {
            console.log('subscribe',channel, message);
//            PubSub.publish('message.channel', { hide: true });
            self.setState({
                currentView: message.currentView,
                params: message.params
            });
        });
        console.log('app.initialRoute',app);
        Router.navigate(app.initialRoute);
        Router.check(app.initialRoute);
    },

    render: function () {
        'use strict';
       var viewNodes = [];

        switch (this.state.currentView) {

            case 'AddCard':
                viewNodes.push(
                    <AddCard />
                );
                break;

            case 'Login':
                viewNodes.push(
                    <Login />
                );
                break;
        }

        return (
            <div className='main-wrapper'>
                <div className='main-frame'>
                    {viewNodes}
                </div>
            </div>
            );
    }
});

React.render(
    <App />, document.getElementById('screen')
);