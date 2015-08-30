var AppDispatcher = require('../dispatcher/AppDispatcher');
var FluxCartConstants = require('../constants/FluxCardConstants');

var FluxCardActions = {

    receiveCard: function(data) {
        AppDispatcher.handleAction({
            actionType: FluxCartConstants.RECEIVE_DATA,
            data: data
        })
    },

    selectCard: function(index) {
        AppDispatcher.handleAction({
            actionType: FluxCartConstants.SELECT_PRODUCT,
            data: index
        })
    },

    addToCard: function(sku, update) {
        AppDispatcher.handleAction({
            actionType: FluxCartConstants.CART_ADD,
            sku: sku,
            update: update
        })
    },

    removeCard: function(sku) {
        AppDispatcher.handleAction({
            actionType: FluxCartConstants.CART_REMOVE,
            sku: sku
        })
    },

    updateCardVisible: function(cartVisible) {
        AppDispatcher.handleAction({
            actionType: FluxCartConstants.CART_VISIBLE,
            cartVisible: cartVisible
        })
    }
};

module.exports = FluxCardActions;