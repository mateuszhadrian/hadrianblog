import React from 'react';
import firebase from 'firebase';
import {DB_CONFIG} from '../../Config';

import Header from './Header/Header'
import Main from './Main/Main'

class Container extends React.Component {
    constructor() {
        super()
        
        this.app = firebase.initializeApp(DB_CONFIG);
        this.database = this.app.database().ref('blogArticles');

        this.state = {
            articles: []
        }
    }
    componentDidMount() {
        this.database.on('value', snap => {
            this.setState({
                articles: Object.values(snap.val())
            });
        });
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