import React from 'react';
import "./AddPost.css"
import "./Posts.css"
class AddPost extends React.Component {
    state = {
        posts: [
            {
            postId: 1,
            title: "Malta",
            author: "Ana",
            imageURL: "https://www.travelmagazine.rs/wp-content/uploads/2019/04/malta-1964700_960_720.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tincidunt ornare massa eget. Quisque sagittis purus sit amet volutpat consequat. Dictum sit amet justo donec enim. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus. Nulla facilisi morbi tempus iaculis urna. At in tellus integer feugiat scelerisque varius morbi enim nunc. Turpis in eu mi bibendum. Morbi non arcu risus quis. Volutpat lacus laoreet non curabitur gravida arcu ac tortor. Leo integer malesuada nunc vel risus commodo viverra. Lacus vestibulum sed arcu non odio euismod lacinia at. Dui sapien eget mi proin sed libero enim sed. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi."            
        }
    ]
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.posts);
        let { title, author, imageURL, description } = this.state.posts;
            let newPost = {
                postId: this.state.posts.length +1,
                imageURL: this.state.imageURL,
                title: this.state.title,
                author: this.state.author,
                description: this.state.description
            }
            let posts = this.state.posts;
            posts.push(newPost)
            console.log(posts);
            this.setState({posts})
            fetch("https://jsonblob.com/api/jsonBlob/927649810056757248", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.posts)
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.log(error))
        
    }
    

handleChange = (e) => {
    let name = e.target.name;
    this.setState({[name]: e.target.value})
}

render() {
    return <div>
        <form method='POST' className='form' onSubmit={this.handleSubmit}>
            <div className="row">
                <h2>Add Post</h2>
                <div className="input-field col s12">
                    <i className="material-icons prefix">location_on</i>
                    <input id="title" name='title' type="text" className="validate"  value={this.state.posts.title} onChange={this.handleChange} />
                    <label htmlFor="title">Destination</label>
                </div>
                <div className="input-field col s12">
                    <i className="material-icons prefix">create</i>
                    <input id="author" name='author' type="text" className="validate"  value={this.state.posts.author} onChange={this.handleChange} />
                    <label htmlFor="author">Author</label>
                </div>
                <div className="input-field col s12">
                    <i className="material-icons prefix">attach_file</i>
                    <label htmlFor="image-url">Image url</label>
                    <input id="image-url" name='imageURL' type="text" className="validate"  value={this.state.posts.imageURL} onChange={this.handleChange} />
                </div>
                <div className="input-field col s12">
                    <textarea id="description" name='description' value={this.state.posts.description} className="materialize-textarea" onChange={this.handleChange}></textarea>
                    <label htmlFor="description">Say something about this destination...</label>
                </div>
                <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                </button>
            </div>
        </form>
    </div>;
}
}

export default AddPost;