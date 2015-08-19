var List = React.createClass({
    render: function() {
        var createItem = function(itemText, index) {
            return <li key={index + itemText} className='topcoat-list__item'>{itemText}</li>;
        };
        return <ul className='topcoat-list__container'>{this.props.items.map(createItem)}</ul>;
    }
});
var AddCard = React.createClass({
    getInitialState: function() {
        return {items: [], text: ''};
    },
    onChange: function(e) {
        this.setState({text: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var nextItems = this.state.items.concat([this.state.text]);
        var nextText = '';
        this.setState({items: nextItems, text: nextText});
    },
    render: function() {
        return (
            <div>
                <h3>Add card</h3>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.onChange} value={this.state.text} />
                    <button>Add</button>
                </form>
            <div className='topcoat-list'>
                <List items={this.state.items} />
            </div>
            </div>
            );
    }
});
