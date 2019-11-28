import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';

import firebase from 'firebase';
import {DB_CONFIG} from './Config';


class App extends React.Component {
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
        console.log(this.state.articles)
        return (
            <div>
             {this.state.articles.map(item=>(
             <>
             <h1>{item.title}</h1>
             <p>{item.content}</p>
             </>
             ))}
            </div>
        )
    }
} 

ReactDOM.render(
    <App />,
    document.getElementById('root')    
)
