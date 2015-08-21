
Parse.initialize("1D42VXTI4hXuAN5QwdgUZE7eQJYO0vdmsTPFwfDC", "Ufengg1hLHjvKQ46j3mtNM8AmqFw7HB8CGU4iP5y");
var initialRoute = window.location.hash.slice(1, window.location.hash.length),
    app = {
        initialRoute : initialRoute ? initialRoute : 'Login'
    };
console.log('###########',initialRoute);
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