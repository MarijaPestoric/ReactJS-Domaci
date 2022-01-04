import React from 'react';
import "./AddPost.css"
class AddPost extends React.Component {
    state = {
        posts: [
            {
                postId: 1,
                title: "Bora Bora",
                author: 'Marija',
                imageURL: "https://www.portalmladi.com/wp-content/uploads/2015/10/bora-bora-odmor.png",
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat. Eget est lorem ipsum dolor sit amet consectetur adipiscing elit. '
            }
        ]
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { title, author, description } = this.state;
        if(title.length > 20 || author.length > 20 || description.length<250){
            console.log("Please make sure you don't go above limit");
        } else {
            let newPost = {
                postId: this.state.posts.length + 1,
                title: this.state.title,
                author: this.state.author,
                imageURL: this.state.imageURL,
                description: this.state.description
            }
            let posts = this.state.posts;
            console.log(posts, newPost);
            posts.push(newPost)
            this.setState((prevState) => ({
                posts: {
                    ...prevState.posts,
                    posts: posts
                }
            }));
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
    }
    handleChange = (e) => {
        let name = e.target.name;
        this.setState({ [name]: e.target.value })
    }
    render() {
        return <div>
            <form method='POST' className='form' onSubmit={this.handleSubmit}>
                <div className="row">
                    <h2>Add Post</h2>
                    <div className="input-field col s12">
                        <i className="material-icons prefix">location_on</i>
                        <input id="title" name='title' type="text" value={this.state.posts.title} onChange={this.handleChange} />
                        <label htmlFor="title">Destination</label>
                    </div>
                    <div className="input-field col s12">
                        <i className="material-icons prefix">create</i>
                        <input id="author" name='author' type="text" value={this.state.posts.author} onChange={this.handleChange} />
                        <label htmlFor="author">Author</label>
                    </div>
                    <div className="input-field col s12">
                        <i className="material-icons prefix">attach_file</i>
                        <label htmlFor="image-url">Image url</label>
                        <input id="image-url" name='imageURL' type="text" value={this.state.posts.imageURL} onChange={this.handleChange} />
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