import React from 'react';

import Header from './Header/Header'
import Main from './Main/Main'
import { DbHelperSingleton } from '../../Helpers/dbHelper';

class Container extends React.Component {
    constructor() {
        super()
        
        this.database = DbHelperSingleton.getInstance().getArticles();

        this.state = {
            articles: []
        }
    }
    componentDidMount() {
        this.database.on('value', snap => {
            if (snap.val()) {
                this.setState({
                    articles: Object.values(snap.val())
                });
            } else {
                this.setState({
                    articles: [{
                        title: 'BRAK ARTYKUŁÓW',
                        content: 'BRAK ARTYKUŁÓW DO WYŚWIETLENIA',
                        id: 'noID'
                    }]
                })
            }
        });
    }

    componentWillUnmount() {
        this.database.removeEventListener('value');
    }

    render() {
        return (
            <section className="container">
            <Header />
            <Main 
            articles={this.state.articles}
            />
        </section>
        )
    }

} 

export default Container