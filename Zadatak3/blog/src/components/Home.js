import React from 'react';
import { Link } from "react-router-dom";
import Posts from "./Posts"
import "./Home.css"

class Home extends React.Component {
    state = {
        allPosts: []
    }
    componentDidMount() {
        fetch("https://jsonblob.com/api/jsonBlob/927649810056757248")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                let allPosts = data;
                console.log(allPosts);
                this.setState({ allPosts })
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
        return (
            <div class="row">
                <h2>All Posts</h2>
                    {this.postsToShow()}
                </div>
        )
    }
}

export default Home;