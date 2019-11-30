import React from 'react';
import Blog from './Blog/Blog'
import Form from './Form/Form'

import { DbHelperSingleton } from '../../../../Helpers/dbHelper';

const BlogContainer = (props) => {

    const addPost = (e) => {
        e.preventDefault();
        if ((e.target[0].value == '')||(e.target[1].value == '')){
            alert('Wypełnij oba pola')
        } else {
            DbHelperSingleton.getInstance().pushArticle({
                title: e.target[0].value,
                content: e.target[1].value });
                e.target[0].value = '';
                e.target[1].value = '';
        }
    }

    const removePost = (id) => {
        DbHelperSingleton.getInstance().removeArticle(id);
    }

    return (
    <>
        <Form 
        submitFn={addPost}
        
        />  
        <Blog
        articles={props.articles}
        removeFn={removePost}
        />
    </> 
    )
}
export default BlogContainer;