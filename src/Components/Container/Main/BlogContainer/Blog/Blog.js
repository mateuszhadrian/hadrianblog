import React from 'react';

const Blog = (props) => {
    return (
        <div className="blog">
            {props.articles.reverse().map(item=><><article className="article">
                <h2 className="article__header">{item.title}</h2>
                    <div className="article__area">
                        <p className="article__content">{item.content}</p>
                        <button id={item.id} className="article__button--remove">X</button>
                    </div>                
                </article></>
            )}
        </div>
    )
}

export default Blog;