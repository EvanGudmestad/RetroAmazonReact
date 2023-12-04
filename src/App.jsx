import { useState, useEffect } from 'react'
import {Route,Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import NavBar from './components/NavBar'
import BookList from './components/BookList'
import LoginForm from './components/LoginForm'
import BookEditor from './components/BookEditor'
import RegisterUserForm from './components/RegisterUserForm'
import AddBook from './components/AddBook'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  const [fullName, setFullName] = useState("");
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fullName = localStorage.getItem('fullName');
    const userRole = localStorage.getItem('userRole');
    if(fullName){
      setFullName(fullName);
    }
    if(userRole){
      setUserRole(userRole);
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
        <NavBar fullName={fullName} userRole={userRole} setFullName={setFullName}  />
      </header>
      <main className='flex-grow-1'>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<BookList showToast={showToast} userRole={userRole} />} />
          <Route path='/login' element={<LoginForm setFullName={setFullName} setUserRole={setUserRole}/>} />
          <Route path='/register' element={<RegisterUserForm showToast={showToast} setFullName={setFullName} setUserRole={setUserRole} />} />
          <Route path='/addbook' element={<AddBook showToast={showToast} />} />
          <Route path='/contact' element={<h1>Contact</h1>} />
          <Route path="/books/update/:bookId" element={<BookEditor showToast={showToast} />} />
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
