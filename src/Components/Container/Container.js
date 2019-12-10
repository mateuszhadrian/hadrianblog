import React from 'react';
import {HashRouter, Route} from 'react-router-dom'
import GalleryView from '../../views/GalleryView/GalleryView'
import LoginView from '../../views/LoginView/LoginView'

import Header from './Header/Header'
import Main from './Main/Main'
import { DbHelperSingleton } from '../../Helpers/dbHelper';

class Container extends React.Component {
    constructor() {
        super()
        
        this.database = DbHelperSingleton.getInstance().getArticles();

        this.state = {
            articles: [],
            user: {}
        }
    }
    componentDidMount() {
        this.authListener();
        this.database.on('value', snap => {
            const values = snap.val()
                this.setState({
                    articles: values ? Object.values(values).reverse() : []
                });
        });
    }

    componentWillUnmount() {
        this.database.off('value');
    }

    authListener() {
        DbHelperSingleton.getInstance().app.auth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({
              user
            });
          } else{
            this.setState({
              user: null
            })
          }
        });
      }

    render() {
        return (
            <HashRouter>
            <>
            <section className="container">
            <Header />
            <Route exact path="/" component={() => <Main user={this.state.user} articles={this.state.articles} />}/>
            <Route path="/gallery" component={() => <GalleryView user={this.state.user} />} />
            <Route path='/admin' component={() => <LoginView user={this.state.user} />} />
            
        </section>
            </>
            </HashRouter>    
        )
    }

} 

export default Container