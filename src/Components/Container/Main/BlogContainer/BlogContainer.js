import React from 'react';
import Blog from './Blog/Blog'
import Form from './Form/Form'
import EmptyField from './EmptyField/EmptyField'

import { DbHelperSingleton } from '../../../../Helpers/dbHelper';

class BlogContainer extends React.Component {
    constructor() {
        super()

        this.state = {
            errorInfo: ""
        }
    }

        addPost = (e) => {
            e.preventDefault();
            if ((e.target[0].value === '')||(e.target[1].value === '')){
                this.setState({
                    errorInfo: "Wypełnij oba pola zanim dodasz artykuł!!"
                });
            } else {
                this.setState({
                    errorInfo: ""
                })
                
                DbHelperSingleton.getInstance().pushArticle({
                    title: e.target[0].value,
                    content: e.target[1].value });
                    e.target.reset();
            }
        }
    
        removePost = (id) => {
            DbHelperSingleton.getInstance().removeArticle(id);
        }
    
    

    render() {
        return (
            <>
                {this.props.user ? (<Form submitFn={this.addPost} /> ) : null}
                 
                {!!this.state.errorInfo && 
                <EmptyField 
                errorMessage = {this.state.errorInfo}/>
                }
                <Blog
                user={this.props.user}
                articles={this.props.articles}
                removeFn={this.removePost}
                />
            </> 
            )
    }
    
}
export default BlogContainer;