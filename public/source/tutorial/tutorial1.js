var Picture = React.createClass({

    clickHandler: function(){
        console.log('Picture',this.props);
        this.props.onClick(this.props.ref);
    },

    render: function(){

        var cls = 'picture ' + (this.props.favorite ? 'favorite' : '');
        return (
            <div className={cls} onClick={this.clickHandler}>
                <img id={this.props.id} src={this.props.src} width="200" title={this.props.title} />
            </div>
            );
    }
});

var PictureList = React.createClass({

    getInitialState: function(){
        return { pictures: [], favorites: [],
            items: ['Home', 'Services', 'About', 'Contact us']};
    },

    componentDidMount: function(){
        var self = this;
        var url = 'https://api.instagram.com/v1/media/popular?client_id=' + this.props.apiKey + '&callback=?';

        $.getJSON(url, function(result){
            console.log('getJSON',result);
            if(!result || !result.data || !result.data.length){
                return;
            }
            var pictures = result.data.map(function(p){

                return {
                    id: p.id,
                    url: p.link,
                    src: p.images.low_resolution.url,
                    title: p.caption ? p.caption.text : '',
                    favorite: false
                };

            });

            self.setState({ pictures: pictures });
        });
    },

    pictureClick: function(id){
        console.log('favorite-----id',id);
        var favorites = this.state.favorites,
            pictures = this.state.pictures;
        console.log('favorite-----pictureClick',favorites,pictures);
        for(var i = 0; i < pictures.length; i++){

            if(pictures[i].id == id) {
                if(pictures[i].favorite){
                    return this.favoriteClick(id);
                }

                favorites.push(pictures[i]);
                pictures[i].favorite = true;

                break;
            }
        }
        this.setState({pictures: pictures, favorites: favorites});
    },

    favoriteClick: function(id){

        var favorites = this.state.favorites,
            pictures = this.state.pictures;
            console.log('favorite-----favoriteClick',favorites,pictures);

        for(var i = 0; i < favorites.length; i++){
            if(favorites[i].id == id) break;
        }
        favorites.splice(i, 1);

        for(i = 0; i < pictures.length; i++){
            if(pictures[i].id == id) {
                pictures[i].favorite = false;
                break;
            }
        }
        console.log('state obj',{pictures: pictures, favorites: favorites});
        this.setState({pictures: pictures, favorites: favorites});

    },

    render: function() {

        var self = this;
        var pictures = this.state.pictures.map(function(p){
            return <Picture key={p.id}
            ref={p.id}
            key={p.id}
            src={p.src}
            title={p.title}
            favorite={p.favorite}
            onClick={self.pictureClick.bind(null, p.id)} />
        });

        if(!pictures.length){
            pictures = <p>Loading images..</p>;
        }

        var favorites = this.state.favorites.map(function(p){
            console.log('favorites',p);
            return <Picture ref={p.id}
            key={p.id}
            src={p.src}
            title={p.title}
            favorite={true}
            onClick={self.favoriteClick.bind(null, p.id)} />
        });

        if(!favorites.length){
            favorites = <p>Click an image to mark it as a favorite.</p>;
        }

        return (
            <div>
                <h1>Navigation</h1>
                <div className="nav-menu"> <MenuExample items={ ['Home', 'Services', 'About', 'Contact us'] } /> </div>
                <h1>Popular Instagram pics</h1>
                <div className="pictures"> {pictures} </div>

                <h1>Your favorites</h1>
                <div className="favorites"> {favorites} </div>
            </div>
            );
    }

});
var MenuExample = React.createClass({

    getInitialState: function(){
        return { focused: 0 };
    },

    clicked: function(index){

        // Обработчик клика обновит состояние
        // изменив индекс на сфокусированный элемент меню

        this.setState({focused: index});
    },

    render: function() {

        // Здесь мы читаем свойство items, которое было передано
        // атрибутом, при создании компонента

        var self = this;

        // Метод map пройдется по массиву элементов меню,
        // и возвратит массив с <li> элементами.

        return (
            <div>
                <ul>{ this.props.items.map(function(m, index){

                    var style = '';

                    if(self.state.focused == index){
                        style = 'focused';
                    }

                    // Обратите внимание на использование метода bind(). Он делает
                    // index доступным в функции clicked:

                    return <li className={style} onClick={self.clicked.bind(self, index)}>{m}</li>;

                }) }

                </ul>

                <p>Selected: {this.props.items[this.state.focused]}</p>
            </div>
            );

    }
});

React.render(
    <PictureList apiKey="642176ece1e7445e99244cec26f4de1f" />,
    document.getElementById('screen')
);