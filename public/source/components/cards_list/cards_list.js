var List = React.createClass({

    getInitialState: function() {
        return {
            items: [],
            finished: false,
            ShoppingList: new ParseShoppingList
//            ShoppingList: Parse.Object.extend("ShoppingList")
        };
    },
    componentDidMount: function () {
        this.state.ShoppingList.load();
        var self = this;
        PubSub.subscribe('list.channel', function (channel, message) {
//            console.log('subscribe-form-list',channel, message);
            console.log('componentDidMount',self.state.ShoppingList,message);
            self.setState({items: message});
        });
    },
    handleClick: function (id) {
//        console.log('clickHandler',this.props,id);
        this.removeItem(id);
    },
    handleChange: function (index, e) {
        var value = e.target.checked;
//        var valueSelect = this.refs.itemSelector.getDOMNode().checked;
        var checkedModel = this.state.ShoppingList.at(index);
        var id = e.target.getAttribute('data-id');
        var state = this.state.items.map(function(d) {
            return {
                id: d.id,
                name: d.name,
                amount: d.amount,
                finished: (d.id === id ? !d.finished : d.finished)
            };
        });
        checkedModel.set({content: state[index]});
        checkedModel.save();
        this.setState({ items: state });

        console.log('handleChange',value,state,this.state.ShoppingList.at(index));
//        this.setState({items: state});
//        checkedItem.className += ' finished';
    },
    componentWillReceiveProps: function (nextProps) {
        this.state.items.push(nextProps.items);
        this.state.ShoppingList.load();
        console.log('componentWillReceiveProps',this.state.ShoppingList,nextProps,this.state.items);
//        this.load();
//        PubSub.subscribe('list.channel', function (channel, message) {
//            console.log('subscribe-form-list',channel, message);
//            self.setState({items: message});
//        });
    },
//    load: function (){
//        var self = this,
//            currentUser = new Parse.ACL(Parse.User.current()),
//            query = new Parse.Query(this.state.ShoppingList),
//            resultsData;
//        console.log('currentUser',currentUser);
//        query.equalTo('user', currentUser);
//        query.find({
//            success: function(results) {
//                console.log('results',results);
//                var mapData;
//                resultsData = results.map(function(item){
//                    mapData = item.get('content');
//                    return {
//                        id: item.id,
//                        name: mapData.name,
//                        amount: mapData.amount
//                    };
//                });
//                console.log('success result',resultsData );
//            },
//            error: function(error) {}
//        }).then(function (obj) {
//            self.setState({items: resultsData});
//        });
//    },
    removeItem: function (id) {
        console.log('removeItem',this.state.ShoppingList.models,id);
        var destroyModel = this.state.ShoppingList.models[id];
        destroyModel.destroy();
        this.state.ShoppingList.load();
//        this.state.List.remove(id);
//        var currentUser = new Parse.ACL(Parse.User.current()),
//            query = new Parse.Query(this.state.ShoppingList),
//            self=this;
//        console.log('currentUser',currentUser);
//        query.equalTo('user', currentUser);
//        query.equalTo('objectId', id);
//        query.find({
//            success: function(data) {
//                Parse.Object.destroyAll(data, {
//                    success: function () {},
//                    error: function (error) {}
//                });
//            },
//            error: function(error) {}
//        }).then(function (obj) {
//            console.log('remove=then',obj );
//            self.load();
//        });
    },

    render: function() {
        var self = this;
        console.log('createItem',this.state.items);
        var createItem = function (items, index) {
            return <li className={items.finished ? 'list-item finished' : 'list-item '}>
                <div className="delete" onClick={self.handleClick.bind(self, index)}>del</div>
                <div className="itemContent">
                    <input type="checkbox" data-id={items.id} checked={self.state.items[index].finished} onChange={self.handleChange.bind(this, index)}/>
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