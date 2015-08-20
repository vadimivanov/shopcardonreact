var List = React.createClass({
    handleClick: function (id) {
        console.log('clickHandler',this.props,id);
        this.props.onClick(id);
    },
    render: function() {
        var self = this;
        var createItem = function(items, index) {
        console.log('createItem',items);
            return <li key={items.id} className='list-item'>
                        <div className="delete" onClick={self.handleClick.bind(self, items.id)}>
                            del
                        </div>
                        <div className="itemContent">
                            <input type="checkbox"/>
                            <span className="itemName">
                                {items.name}
                            </span>
                            <span className="itemAmount">
                                {items.amount}
                            </span>
                        </div>
                    </li>
        };
        return <ul className='list'>{this.props.items.map(createItem)}</ul>;
    }
});
var AddCard = React.createClass({
    getInitialState: function() {
        return {items: [], ShoppingList: new ParseShoppingList};
    },
    componentDidMount: function () {
        'use strict';
       this.getList();
    },
    handleChange: function () {
        this.getList();
    },
    getInfo: function(e) {
        var name = this.refs.name.getDOMNode().value,
            amount = this.refs.amount.getDOMNode().value,
            key = Parse.User.current();
//            this.state.items.push({name: name, amount: amount});
        var ShoppingList = Parse.Object.extend("ShoppingList");
        var privateNote = new ShoppingList;
        privateNote.set("content", {name: name, amount: amount});
        privateNote.set("user", new Parse.ACL(Parse.User.current()));
        privateNote.save();
        this.handleChange();
    },
    getList: function () {
        var self = this;
        console.log('ShoppingList');
        PubSub.subscribe('list.channel', function (channel, message) {
            console.log('subscribe-form',channel, message);
            self.setState({items: message});
        });
    },
    removeItem: function (id) {
        this.state.ShoppingList.remove(id);
            console.log('removeItem',ParseShoppingList);
//        modelToRemove.destroy();
    },
    render: function() {
        return (
            <div>
                <h3>Add card</h3>
                <form>
                    <input ref="name" />
                    <input ref="amount" />
                    <button onClick={this.getInfo}>Add</button>
                </form>
            <div className='list-wrap'>
                <List items={this.state.items} onClick={this.removeItem}/>
            </div>
            </div>
            );
    }
});
