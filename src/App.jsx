import { useState, useEffect } from 'react'
import {Route,Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import NavBar from './components/NavBar'
import BookList from './components/BookList'
import LoginForm from './components/LoginForm'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const fullName = localStorage.getItem('fullName');
    if(fullName){
      setFullName(fullName);
    }
  }, []);

  function showToast(message, type){
    toast(message, {
      type: type,
      position: 'bottom-right'
    });
  }

  return (
    <>
    <div className='container d-flex flex-column min-vh-100'>
      <header>
        <NavBar fullName={fullName} setFullName={setFullName}  />
      </header>
      <main className='flex-grow-1'>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<BookList showToast={showToast} />} />
          <Route path='/login' element={<LoginForm setFullName={setFullName}/>} />
          <Route path='/contact' element={<h1>Contact</h1>} />
        </Routes>
      </main>
      <footer>
        <h6>This is my footer</h6>
      </footer>
     </div>
    </>
  )
}

export default App
