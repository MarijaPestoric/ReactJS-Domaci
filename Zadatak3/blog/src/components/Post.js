import React from "react";
import { Link } from "react-router-dom";
import Posts from "./Posts";
import "./Post.css";
import "./Home.css";

class Home extends React.Component {
  state = {
    allPosts: [],
    post: {},
    loading: true
  };
  componentDidMount() {
    fetch("https://jsonblob.com/api/jsonBlob/927649810056757248")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        let allPosts = data;
        let post = allPosts.find(
            ({ postId }) => postId === parseInt(this.props.match.params.id)
          );
        this.setState({ post, loading: false });
      })
      .catch((err) => {
        console.log("Error while fetching" + err);
      });
  }
  render() {
    
      if (this.state.loading === true) {
          return (
              <div className="progress">
                  <div className="indeterminate"></div>
              </div>
          )
      }
    console.log(this.state)
    return (
      <div className="row single-post">
        <h2 className="post-title">{this.state.post.title}</h2>
        <img className="post-image"src={this.state.post.imageURL} alt='image' />
        <div className="post-description">{this.state.post.description}</div>
        <div className="post-author">Author: <em>{this.state.post.author}</em> </div>
      </div>
    );
  }
}

export default Home;
