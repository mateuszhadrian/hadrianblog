import firebase from 'firebase';
import {DB_CONFIG} from '../Config'

class DbHelper {
    articles = 'blogArticles';

    constructor() {
        this.app = firebase.initializeApp(DB_CONFIG);
    }

    getId = () => this.app.database().ref(this.articles).push().key;

    pushArticle = (article) => {
        const randomId = this.getId();
        this.app.database().ref(this.articles).child(randomId).set({
            id: randomId,
            title: article.title,
            content: article.content
        })
    }

    getArticles = () => this.app.database().ref(this.articles);
    removeArticle = (id) => this.getArticles().child(id).remove();
}
 
export const DbHelperSingleton = (function () {
    let instance;
 
    function createInstance() {
        let object = new DbHelper();
        return object;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();