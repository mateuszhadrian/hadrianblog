import React from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom'
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
            const values = snap.val()
                this.setState({
                    articles: values ? Object.values(values) : []
                });
        });
    }

    componentWillUnmount() {
        this.database.removeEventListener('value');
    }

    render() {
        return (
            <HashRouter>
            <>
            <section className="container">
            <Header />
            <Route exact path="/" component={() => <Main articles={this.state.articles} />}/>
            <Route path="/gallery" component={GalleryView}/>
            
        </section>
            </>
            </HashRouter>    
        )
    }

} 

export default Container