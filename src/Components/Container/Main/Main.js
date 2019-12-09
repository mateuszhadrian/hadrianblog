import React from 'react';
import BlogContainer from './BlogContainer/BlogContainer'


const Main = (props) => {
    
    return (
        <main className="main">
            <BlogContainer user={props.user} articles={props.articles} />
        </main>
    );
}

export default Main