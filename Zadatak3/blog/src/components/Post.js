import React from "react";
import { Link } from "react-router-dom";
import Posts from "./Posts";
import "./Home.css";

class Home extends React.Component {
  state = {
    allPosts: [],
    post: {},
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
        this.setState({ post });
      })
      .catch((err) => {
        console.log("Error while fetching" + err);
      });
  }
  render() {

    console.log(this.state)
    return (
      <div class="row">
        <h2>All Posts</h2>
        <div>{this.state.post.title}</div>
        <div>{this.state.post.description}</div>
        <img src={this.state.post.imageURL} alt='image' />
        <div>{this.state.post.author}</div>

      </div>
    );
  }
}

export default Home;
