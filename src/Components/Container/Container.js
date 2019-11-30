import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import BlogView from '../../views/BlogView/BlogView'
import GalleryView from '../../views/GalleryView/GalleryView'

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
            <BrowserRouter>
            <>
            <section className="container">
            <Header />
            <Route exact path="/" component={() => <Main articles={this.state.articles} />}/>
            <Route path="/gallery" component={GalleryView}/>
            {/* <Main 
            articles={this.state.articles} */}
        </section>
            </>
            </BrowserRouter>    
        )
    }

} 

export default Container