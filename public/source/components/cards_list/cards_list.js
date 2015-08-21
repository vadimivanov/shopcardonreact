var List = React.createClass({

    getInitialState: function() {
        return {
            items: [],
            render: false,
            ShoppingList: Parse.Object.extend("ShoppingList")

        };
    },
    componentDidMount: function () {
        this.load();
    },
    handleClick: function (id) {
        console.log('clickHandler',this.props,id);
        this.removeItem(id);
    },

    componentWillReceiveProps: function () {
        var self = this;
        console.log('componentWillReceiveProps',this.props);
        if (this.props.render == true) {
            this.load();
        }
//        this.load();
//        PubSub.subscribe('list.channel', function (channel, message) {
//            console.log('subscribe-form-list',channel, message);
//            self.setState({items: message});
//        });
    },
    load: function (){
        var self = this,
            currentUser = new Parse.ACL(Parse.User.current()),
            query = new Parse.Query(this.state.ShoppingList),
            resultsData;
        console.log('currentUser',currentUser);
        query.equalTo('user', currentUser);
        query.find({
            success: function(results) {
                console.log('results',results);
                var mapData;
                resultsData = results.map(function(item){
                    mapData = item.get('content');
                    return {
                        id: item.id,
                        name: mapData.name,
                        amount: mapData.amount
                    };
                });
                console.log('success result',resultsData );
            },
            error: function(error) {}
        }).then(function (obj) {
            self.setState({items: resultsData});
        });
    },
    removeItem: function (id) {
        var currentUser = new Parse.ACL(Parse.User.current()),
            query = new Parse.Query(this.state.ShoppingList),
            self=this;
        console.log('currentUser',currentUser);
        query.equalTo('user', currentUser);
        query.equalTo('objectId', id);
        query.find({
            success: function(data) {
                Parse.Object.destroyAll(data, {
                    success: function () {},
                    error: function (error) {}
                });
            },
            error: function(error) {}
        }).then(function (obj) {
            console.log('remove=then',obj );
            self.load();
        });
    },

    render: function() {
        console.log('createItem',this.state.items);
        var self = this;
        var createItem = function (items, index) {
            return <li className='list-item'>
                <div className="delete" onClick={self.handleClick.bind(self, items.id)}>del</div>
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
        return <ul className='list'>{this.state.items.map(createItem)}</ul>;
    }
});