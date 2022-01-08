import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Posts from './components/Posts'
import Header from './components/Header'
import AddPost from './components/AddPost';
import Post from './components/Post';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Header />
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/add" component={AddPost}></Route>
          <Route exact path="/post/:id" component={Post}></Route>
    </div>
    </BrowserRouter>
  );
}

export default App;
