import React from 'react';

const Blog = (props) => {
    if (props.articles[0]===undefined){
        props.articles[0] = {};  
    }

    if (props.articles[0].id==='noID'){
        return (
            <div className="blog-container">
                        <div className="blog">
                {props.articles.reverse().map(item=>
                <article key={item.id} className="article">
                    <h2 className="article__header article__header--noArticles">{item.title}</h2>
                        <div className="article__area">
                            <p className="article__content">{item.content}</p>
                        </div>                
                    </article>
                )}
            </div>
        </div>
        )
    } else
    return (
        <div className="blog-container">
                    <div className="blog">
            {props.articles.reverse().map(item=>
            <article key={item.id} className="article">
                <h2 className="article__header">{item.title}</h2>
                    <div className="article__area">
                        <p className="article__content">{item.content}</p>
                        <button onClick={() => props.removeFn(item.id)} className="article__button--remove">X</button>
                    </div>                
                </article>
            )}
        </div>
    </div>
    )
}

export default Blog;