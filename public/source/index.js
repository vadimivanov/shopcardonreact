var initialRoute = window.location.hash.slice(1, window.location.hash.length),
    app = {
        initialRoute : initialRoute ? initialRoute : 'Login'
    };
Router
    .config({
        mode : 'hash',
        keys : true,
        rerouting: false,
        root: '/'
    })
    .add('Login', function () {
        'use strict';
        PubSub.publish('main.channel', {currentView: 'Login'});
    })
    .add('AddCard', function () {
        'use strict';
        PubSub.publish('main.channel', {currentView: 'AddCard'});
    });

Router.listen();