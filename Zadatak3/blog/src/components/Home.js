import React from 'react';
import { Link } from "react-router-dom";
import Posts from "./Posts"
import "./Home.css"

class Home extends React.Component {
    state = {
        allPosts: [],
        loading: true
    }
    componentDidMount() {
        fetch("https://jsonblob.com/api/jsonBlob/927649810056757248")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data);
                let allPosts = data;
                console.log(allPosts);
                this.setState({ allPosts: allPosts, loading: false })
            })
            .catch((err) => {
                console.log("Error while fetching" + err);
            })
    }
    postsToShow = () => {
        let allPosts = [...this.state.allPosts];
        return allPosts.map((el, index) => {
            return <Posts postInfo={el} key={index}></Posts>
        })
    }
    render() {
        if (this.state.loading === true) {
            return (
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            )
        }
        return (
            <div className="row posts-container">
                <h2>All Posts</h2>
                {this.postsToShow()}
            </div>
        )
    }
}

export default Home;