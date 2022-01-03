import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Post from './components/Post'
import Header from './components/Header'
import AddPost from './components/AddPost';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
        <Routes>
          <Route path="/add" element={<AddPost />}></Route>
        </Routes>
        <Routes>
          <Route path="/post/:id" element={<Post />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
