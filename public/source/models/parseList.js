var ShoppingList = Parse.Object.extend("ShoppingList");
var ParseShoppingList = Parse.Collection.extend({
    model : ShoppingList,
    query : new Parse.Query(ShoppingList),
    initialize : function (){
        var currentUser = new Parse.ACL(Parse.User.current()), self=this;
        console.log('currentUser',currentUser);
        this.query.equalTo('user', currentUser);
        this.query.find({
            success: function(results) {
                var dd,
                items = results.map(function(p){
                    dd = p.get('content');
                    return {
                        id: p.id,
                        name: dd.name,
                        url: dd.amount
                    };

                });
                    console.log('success result',items );
               PubSub.publish('list.channel', items);
            },
            error: function(error) {
                console.log('error',error);
            }
        });
    },
    remove: function (id) {
        var currentUser = new Parse.ACL(Parse.User.current()), self=this;
        console.log('currentUser',currentUser);
        this.query.equalTo('user', currentUser);
        this.query.equalTo('objectId', id);
        this.query.find({
            success: function(data) {
                Parse.Object.destroyAll(data, {
                    success: function () {},
                    error: function (error) {}
                });
            },
            error: function(error) {
                console.log('error',error);
            }
        });
    }
});