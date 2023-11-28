import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterUserForm({showToast, setFullName, setUserRole}){

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 

    const navigate = useNavigate();

    const firstNameError =  !firstName ? 'First Name is required' :'';
    const lastNameError =  !lastName ? 'Last Name is required' :'';
    const emailError =  !emailAddress ? 'Email is required' : !emailAddress.includes('@') ? 'Email must contain @' : '';
    const passwordError =  !password ? 'Password is required' :'';

    const onFormSubmit = (evt) => {
        evt.preventDefault();
        setError('');
       
        if(firstNameError){
            setError(firstNameError);
            return;
        }else if(lastNameError){
            setError(lastNameError);
            return;
        }else if(emailError){
            setError(emailError);
            return;
        }else if(passwordError){
            setError(passwordError);
            return;
        }

        axios.post(`${import.meta.env.VITE_API_URL}/api/users/add`, {fullName: `${firstName} ${lastName}`, email:emailAddress, password}, {withCredentials: true})
        .then(response => {
            //console.log(response.data.message);
            showToast(response.data.message, 'success');
            setFullName(response.data.fullName);
            setUserRole(response.data.role);
            localStorage.setItem('fullName',response.data.fullName);
            navigate('/');
        })
        .catch(error => {
            console.log(error.response.data.message);
            setError(error.response.data.message);
        })
    }

    return (<>
    <div className="row">
    <h1>Register New User</h1>
        {/* First Name Fields */}
        <form onSubmit={(evt) => onFormSubmit(evt) }>
            <div className='form-group col-4'>
                <label htmlFor='firstName' className="form-label">First Name</label>
                <input type='text' className='form-control' id='firstName' autoComplete="given-name" value={firstName} onChange={(evt) => setFirstName(evt.target.value)} />
            </div>
            <div className="col-4"></div>
            <div className="col-4"></div>
            {/* Last Name Field */}
            <div className='form-group col-4 mt-2'>
                <label htmlFor='lastName' className="form-label">Last Name</label>
                <input type='text' className='form-control' id='lastName' autoComplete="family-name" value={lastName} onChange={(evt) => setLastName(evt.target.value)} />
            </div>
            <div className="col-4"></div>
            <div className="col-4"></div>
            {/*Email Address Field  */}
            <div className='form-group col-4 mt-2'>
                <label htmlFor='email' className="form-label">Email Address</label>
                <input type='email' className='form-control' id='email' autoComplete="email" value={emailAddress} onChange={(evt) => setEmailAddress(evt.target.value)} />
            </div>
            <div className="col-4"></div>
            <div className="col-4"></div>
            {/*Password Field */}
            <div className='form-group col-4 mt-2'>
                <label htmlFor='password' className="form-label">Password</label>
                <input type='password' className='form-control' id='password' autoComplete="new-password" value={password} onChange={(evt) => setPassword(evt.target.value)} />
            </div>
            <div className="col-4"></div>
            <div className="col-4"></div>
            <div className="form-group col-4 mt-2">
                <button type='submit' className='btn btn-primary'>Register</button>
            </div>
            <div className="col-4">
                {error &&
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
                }
                
            </div>
        </form>   
    </div>    
    </>)
}