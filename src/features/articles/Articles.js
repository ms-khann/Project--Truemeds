import React, { useEffect, useState } from 'react';
import { fetchArticles } from './articlesSlice';
import { useDispatch, useSelector } from 'react-redux';
import Article from '../articel/Articel';
import loader from './../../loader.gif'

import './style.css'

function Articles() {
    const dispatch = useDispatch();
    const loading_state = useSelector(state => state.articles.status);
    const token = window.localStorage.getItem('token')
    let articles = useSelector(state => state.articles.data.article) || [];
    console.log('loading_state', loading_state);

    useEffect(() => {
        if (token == undefined) {
            window.location.href = '/';
        } else {
            dispatch(fetchArticles(token))
        }
    }, [token]);
    return (
        <div className="container">
            {loading_state === 'loading' ? <div className="loader"><img src={loader} alt="not found" /></div> : null}
            <div className="article">
                {articles.map(article => (
                    <Article
                        key={article.id}
                        author={article.author}
                        categoryId={article.categoryId}
                        categoryName={article.categoryName}
                        createdOn={article.createdOn}
                        description={article.description}
                        id={article.id}
                        image={article.image}
                        name={article.name}
                        type={article.type}
                        url={article.url}
                    />
                ))}
            </div>
        </div>
    )
}

export default Articles;
