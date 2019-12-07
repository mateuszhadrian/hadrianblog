import firebase from 'firebase';
import {DB_CONFIG} from '../Config'

class DbHelper {
    articles = 'blogArticles';
    URLs = 'imageURLs';

    constructor() {
        this.app = firebase.initializeApp(DB_CONFIG);
    }

    getArticleId = () => this.app.database().ref(this.articles).push().key;

    pushArticle = (article) => {
        const randomArticleId = this.getArticleId();
        this.app.database().ref(this.articles).child(randomArticleId).set({
            id: randomArticleId,
            title: article.title,
            content: article.content
        })
    }

    getImageId = () => this.app.database().ref(this.URLs).push().key;

    pushImageUrl = (ImageData) => {
        const randomImageId = this.getImageId();
        this.app.database().ref(this.URLs).child(randomImageId).set({
            ID: randomImageId,
            name: ImageData.name,
            URL: ImageData.URL
        })
    }

    storage = () => this.app.storage()
    getURLs = () => this.app.database().ref(this.URLs);
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