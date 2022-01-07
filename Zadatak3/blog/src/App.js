import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Posts from './components/Posts'
import Header from './components/Header'
import AddPost from './components/AddPost';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Header />
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/add" component={AddPost}></Route>
    </div>
    </BrowserRouter>
  );
}

export default App;
