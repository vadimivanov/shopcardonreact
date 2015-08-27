var CustomAlert = React.createClass({

    getInitialState: function () {
        return {
            text: null,
            isVisible: false
        };
    },

    componentDidMount: function () {
        PubSub.subscribe("alert.channel", function (channel, data) {
            this.show(data);
        }.bind(this));
    },

    show: function (data) {
        var state = this.state;
        state.text = data.error || "Error!";
        state.isVisible = true;
        this.setState(state);
    },

    hide: function () {
        this.setState({isVisible: false});
    },

    render: function () {
        return (
            <div className="alert-wrap lightbox" style={{ display: this.state.isVisible ? 'block' : 'none' }}>
                <div className="alert">
                    <div className="alert-text">
                        <p>{this.state.text}</p>
                    </div>
                    <button onClick={this.hide}>Close</button>
                </div>
            </div>
            );
    }
});