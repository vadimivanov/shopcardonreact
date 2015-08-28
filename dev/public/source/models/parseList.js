var ShoppingList = Parse.Object.extend("ShoppingList");

var ParseShoppingList = Parse.Collection.extend({
    model: ShoppingList,
    query: new Parse.Query(ShoppingList),
    init: function () {
        this.query.equalTo('user', Parse.User.current());
        this.fetch();
    }
});