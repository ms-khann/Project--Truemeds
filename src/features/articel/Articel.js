import React, { useEffect, useState } from 'react';
import './style.css'

function Article({ author, categoryId, categoryName, createdOn, description, id, image, name, type, url }) {
    const token = window.localStorage.getItem('token')
    const handleNotFoundImage = (e) => {
        e.target.src = 'http://www.macedonrangeshalls.com.au/wp-content/uploads/2017/10/image-not-found.png'
    }
    return (
        <div className="card">
            <div className='tile'>
                <img src={image} onError={(e) => handleNotFoundImage(e)} alt="image not found" />
            </div>
            <div className='cardDetails'>
                <h3 className='drName'>{author}</h3>
                <div className="category">
                    <span className='label'>Category</span>
                    <span className="value">{categoryName}</span>
                </div>
                <div className="date">{createdOn}</div>
                <p>{description}</p>
                <div className='name'>{name}</div>
                <a className="btn-sty" href={url} target="_blank" >Read More</a>

            </div>
        </div>
    )
}

export default Article;
