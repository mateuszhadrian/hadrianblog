import React from 'react';
import Blog from './Blog/Blog'
import Form from './Form/Form'

const BlogContainer = (props) => {
    return (
        <>
        <Form />
       <div className="blog-container">
        <Blog
        articles={props.articles}
        />
       </div>
       </> 
)
    }
export default BlogContainer;