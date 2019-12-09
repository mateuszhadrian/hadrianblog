import React from 'react';

const Blog = (props) => {
    const articles = props.articles;
    const isNotEmpty = (articles !== undefined) && (articles.length !== 0);

    return (
        <div className="blog-container">
            <div className="blog">
            {!isNotEmpty && (
            <article className="article">
            <h2 className="article__header article__header--noArticles">PUSTO</h2>
                <div className="article__area">
                    <p className="article__content">BRAK ARTYKUŁÓW DO WYŚWIETLENIA</p>
                </div>                
            </article>
            )}
            {isNotEmpty && props.articles.map(item=>
            <article key={item.id} className="article">
                <h2 className="article__header">{item.title}</h2>
                    <div className="article__area">
                        <p className="article__content">{item.content}</p>
                        {props.user ? (<button onClick={() => props.removeFn(item.id)} className="article__button--remove">X</button>) : (<div></div>)}       
                    </div>                
            </article>
            )}
            </div>
        </div>
    )
}

export default Blog;