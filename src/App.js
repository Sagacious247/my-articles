import logo from './logo.svg';
import './App.css';
import Articles from './components/Articles';
import AddArticle from './components/AddArticle';
import Navbar from './components/Navbar';
import Register from '../src/components/auth/Rgister'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login';
import Article from './components/Article';


function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path='/register' element={
            <Register/>
          } />
          <Route path='/signin' element={<Login/>} />
          <Route path='/article/:id' element={<Article/>}/>
          <Route path='/' element={
            <div className='row'>
             <div className='col-md-8'>
               <Articles/>
             </div>
             <div className='col-md-4'>
              <AddArticle/>
             </div>
            </div>
          } />
        </Routes>
      <Navbar/>
      </Router>
    </div>
  );
}

export default App;
