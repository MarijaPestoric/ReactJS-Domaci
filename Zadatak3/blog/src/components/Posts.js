import React from 'react';
import './Posts.css';
import { Link, Route } from 'react-router-dom';
import Post from './Post'

function Posts(props) {
    return (
        <div className="col s12 m6 l3">
            <div className="card">
                <div className="card-image">
                    <img src={props.postInfo.imageURL} alt='image' />
                </div>
                <span className="card-title">{props.postInfo.title}</span>
                <div className="card-content">
                    <p className='author'>Author: <em>{props.postInfo.author}</em></p>
                </div>
                <div className="card-action">
                    <hr></hr>
                    <Link to={`/post/${props.postInfo.postId}`}>Read more</Link>

                </div>
            </div>
        </div>
    );
}

export default Posts;