var AddCard = React.createClass({
    getInitialState: function() {
        return {
            items: [],
            value: '',
            render: true
        };
    },
    componentDidMount: function () {
        'use strict';
        this.getList();
    },
    handleChange: function (data) {
        var stateItems = this.state.items;
        stateItems.push(data);
        console.log('data',stateItems);
        this.setState({render: true, value: ''});
    },
    getInfo: function(e) {
        var name = this.refs.name.getDOMNode().value,
            amount = this.refs.amount.getDOMNode().value,
            userKey = new Parse.ACL(Parse.User.current()),
            ShoppingList = Parse.Object.extend("ShoppingList"),
            privateNote = new ShoppingList;

        privateNote.set("content", {name: name, amount: amount});
        privateNote.set("user", userKey);
        privateNote.save();
        this.handleChange({
            amount: amount,
            name: name
        });
    },
    getList: function () {
        var self = this;
        PubSub.subscribe('list.channel', function (channel, message) {
            console.log('subscribe-form',channel, message);
            self.setState({items: message});
        });
    },
    logout : function (){
        Parse.User.logOut();
        Router.navigate("Login");
    },
    render: function() {
        var value = this.state.value;
        return (
            <div className='addform-component'>
                <div className="row">
                    <button className="logout" onClick={this.logout}>Log out</button>
                </div>
                <h5>Add notes</h5>
                <div className="row">
                    <label for="name">product name:</label>
                    <input ref="name" type="text" />
                </div>
                <div className="row">
                    <label for="amount">amount:</label>
                    <input ref="amount" type="text"/>
                </div>
                <div className="row">
                    <button onClick={this.getInfo}>Add</button>
                </div>
            <div className='list-wrap'>
                <List render={this.state.render}/>
            </div>
            </div>
            );
    }
});
