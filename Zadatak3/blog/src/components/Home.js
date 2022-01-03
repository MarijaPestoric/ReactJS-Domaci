import React from 'react';
import { Link } from "react-router-dom";
function Home() {
    return ( 
        <div>
            Home <br/>
            <Link to="/post">Post 1</Link>
            <Link to="/post">Post 2</Link>
            <Link to="/post">Post 3</Link>
            <Link to="/post">Post 4</Link>
        </div>
     );
}

export default Home;