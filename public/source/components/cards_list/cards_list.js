var CardsList = React.createClass({

    getInitialState: function () {
        return {
            items: [],
            finished: false
        };
    },
    handleChange: function (index, e) {
        var checkedModel = ParseList.at(index);
        var modelId = e.target.getAttribute('data-id');
        var stateFlag = ParseList.models[index].get('finished');
        checkedModel.set({finished:  (ParseList.models[index].id === modelId ? !stateFlag : stateFlag)});
        checkedModel.save();
        this.setState({ finished: stateFlag });
    },
    removeItem: function (index) {
        console.log('removeItem',ParseList.models,index);
        var destroyModel = ParseList.models[index];
        destroyModel.destroy();
    },
    render: function () {
        var self = this,mapItem,itemFinished;
        console.log('createItem',ParseList);
        return (
            <ul className='list'>
                {ParseList.models.map(function(item, index) {
                    mapItem = item.get('content');
                    itemFinished = item.get('finished');
                    return <li className={itemFinished ? 'list-item finished' : 'list-item '}>
                        <div className="delete" onClick={self.removeItem.bind(null, index)}>del</div>
                        <div className="itemContent">
                            <input type="checkbox" data-id={item.id} checked={itemFinished}
                            onChange={self.handleChange.bind(this, index)}/>
                            <span className="itemName">
                                {mapItem.name}
                            </span>
                            <span className="itemAmount">
                                {mapItem.amount}
                            </span>
                        </div>
                    </li>
                })}
            </ul>
            );
    }
});