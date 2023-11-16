import {useState} from 'react';
import axios from 'axios';
export default function LoginForm(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('');
    
    const emailError =  !email ? 'Email is required' :
    !email.includes('@') ? 'Email must contain @' : '';

    const passwordError = !password ? 'Password is required' :
    password.length < 8 ? 'Password must be at least 8 characters' : '';
    
    
    function onSubmitLogin(evt){
        setError('');
        evt.preventDefault();
        if(emailError){
            setError(emailError);
            return;
        }else if(passwordError){
            setError(passwordError);
            return;
        }
        axios.post('http://localhost:3003/api/users/login', {
              email,password
        },{
            withCredentials: true
        }).then(response => {
            console.log(response.data);
          //  onLogin(auth);
        }).catch(error => {
            console.log(error);
        });
    }
    
    return(
        <>
        <div className="row mt-4">
            <div className="col-4"></div>
            <div className="col-4">
                <form>
                        <div className="mb-3">
                            <label htmlFor="txtEmail" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="txtEmail" aria-describedby="emailHelp" onChange={(evt) => setEmail(evt.target.value)} />
                            <div id="emailHelp" className="form-text">We&apos;ll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="txtPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="txtPassword" onChange={(evt) => setPassword(evt.target.value)} />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Remember Me</label>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={(evt) => onSubmitLogin(evt)}>Submit</button>
                    </form>
             </div>
            <div className="col-4">
                {error &&
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
                }
                
            </div>
            </div>
        </>
    );
}