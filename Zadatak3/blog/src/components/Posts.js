import React from 'react';
import './Posts.css';
import { Link } from 'react-router-dom';
function Posts(props) {
    return (
        <div class="col s12 m6 l3">
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
                        <a href="#">Read more</a>
                    </div>
                </div>
</div>
    );
}

export default Posts;