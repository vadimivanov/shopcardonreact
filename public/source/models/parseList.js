//var ShoppingList = Parse.Object.extend("ShoppingList");
//var ParseShoppingList = Parse.Collection.extend({
//    model: ShoppingList,
//    query: new Parse.Query(ShoppingList),
//    load: function (){
//        var currentUser = new Parse.ACL(Parse.User.current()),
//            self = this,
//            resultsData;
//        console.log('currentUser',currentUser);
//        this.query.equalTo('user', currentUser);
//        this.query.find({
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
//                    console.log('success result',resultsData );
//            },
//            error: function(error) {}
//        }).then(function (obj) {
//            PubSub.publish('list.channel', resultsData);
//            return <List items={resultsData}/>
//        });
//    },
//    remove: function (id) {
//        var currentUser = new Parse.ACL(Parse.User.current()), self=this;
//        console.log('currentUser',currentUser);
//        this.query.equalTo('user', currentUser);
//        this.query.equalTo('objectId', id);
//        this.query.find({
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
//    }
//});