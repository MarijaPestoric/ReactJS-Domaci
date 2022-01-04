import React from 'react';
import './Posts.css'
function Posts(props) {
    return (
        <div class="col s12 m6 l3">

                <div className="card">
                    <div className="card-image">
                        <img src={props.postInfo.imageURL} alt='image' />
                    </div>
                    <span className="card-title">{props.postInfo.title}</span>
                    <div className="card-content">
                        <p>Author: {props.postInfo.author}</p>
                    </div>
                    <div className="card-action">
                        <a href="#">Read more</a>
                    </div>
                </div>
</div>
    );
}

export default Posts;