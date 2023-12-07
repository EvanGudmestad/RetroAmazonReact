/*eslint-disable*/
import {NavLink} from 'react-router-dom';
import './NavBar.css';
import axios from 'axios';

export default function NavBar({fullName, setFullName, userRole}){

    function onClickLogout(evt){
        evt.preventDefault();

        axios.post(`${import.meta.env.VITE_API_URL}/api/users/logout`,{},{withCredentials: true})
        .then(response => {
            setFullName('');
            localStorage.removeItem('fullName');
            localStorage.removeItem('userRole');
            window.location.reload();
        }).catch(error => console.log(error));

    }
    return(
    <nav>
          <ul className='nav nav-tabs'>
            <li className='nav-item'>
              <NavLink to='/' className='nav-link'>
                Home
              </NavLink>
            </li>
            {userRole && userRole?.includes('developer') && 
            <li>
              <NavLink to='/addbook' className='nav-link'>
                Add Book
              </NavLink>
            </li> }
            {!fullName &&
            <>
                <li className='nav-item'>
                  <NavLink to='/login' className='nav-link'>
                    Login
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink to='/register' className='nav-link'>
                    Register
                  </NavLink>
                </li>
              </>
            }
            <li className='nav-item'>
              <NavLink to='/contact' className='nav-link'>
                Contact
              </NavLink>
            </li>
            {fullName && 
              <div className='nav-item-group'>
                <li className='nav-item'>
                    <NavLink to='/profile' className='nav-link'>
                      {fullName}
                    </NavLink>
                </li>
                <li className='nav-item'>
                    <button className='nav-link' onClick={(evt) => onClickLogout(evt)}>
                      Logout
                    </button>
                </li>
              </div>
            }
          
          </ul>
        </nav>
    );
}