import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoggedInContext from '../contexts/LoggedInContext';
import './Login.css';
import progress from '../in_progress.gif';
import AlertContext from '../contexts/AlertContext';

function Login() {
    document.title = 'Cloud Notebook | Login';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailStateChanged, setEmailStateChanged] = useState(false);
    const [passwordStateChanged, setPasswordStateChanged] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);
    
    const loggedInState = useContext(LoggedInContext);
    const alertStates = useContext(AlertContext);

    const navigate = useNavigate();
    
    const submitHandler = async () => {
        alertStates.setDisplayAlert(false);
        let isUnmount = false;
        if(!isUnmount) {
            setLoggingIn(true);
        }
        let data = {
            email: email,
            password: password
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };
        try {
            let response = await fetch('/api/auth/login', requestOptions);
            localStorage.setItem('auth-token', response.headers.get('auth-token'));
            if(response.status === 200) {
                loggedInState.setLoggedIn(true);
                isUnmount = true;
                navigate('/notes')
            } else {
                loggedInState.setLoggedIn(false);
                setLoggingIn(false);
                isUnmount = true;
                alertStates.setErrorCode(401);
                alertStates.setAlertMessage('Invalid login Credentials!');
                alertStates.setDisplayAlert(true);
            }
        } catch(err) {
            console.log(err);
            setLoggingIn(false);
            isUnmount = true;
            alertStates.setErrorCode(500);
            alertStates.setAlertMessage("Can't connect to the server!");
            alertStates.setDisplayAlert(true);
        }
        if(!isUnmount) {
            setLoggingIn(false);
        }
    }

    useEffect(() => {
        const validateEmail = (email) => {
            if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email))
            {
                return (true)
            }
            return (false)
        }
        if(email.length === 0 && emailStateChanged) {
            document.getElementById('email-warning').style.display = 'inline';
            document.getElementById('email-warning').innerHTML = '(Field cannot be empty)';
            setEmailValid(false);
        } else if(!validateEmail(email) && emailStateChanged) {
            document.getElementById('email-warning').style.display = 'inline';
            document.getElementById('email-warning').innerHTML = '(Enter a valid email)';
            setEmailValid(false);
        } else {
            document.getElementById('email-warning').style.display = 'none';
            setEmailValid(true);
        }
    }, [email, emailStateChanged]);

    useEffect(() => {
        if(password.length < 5 && passwordStateChanged) {
            document.getElementById('password-warning').style.display = 'inline';
            setPasswordValid(false);
        } else {
            document.getElementById('password-warning').style.display = 'none';
            setPasswordValid(true);
        }
    }, [password, passwordStateChanged]);

    useEffect(() => {
        if(emailValid && passwordValid && email.length!==0 && password.length!==0) {
            document.getElementById('submit-btn').disabled = false;
        } else {
            document.getElementById('submit-btn').disabled = true;
        }
    }, [emailValid, passwordValid, email, password]);

    return (
        <div style={{'minHeight': '88vh'}}>
            <div id='login-primary'>
                <div id='login-primary-content' className='container'>
                    <h1>Log In to Cloud Notebook</h1>
                    <span>Access all your notes by logging in to Cloud Notebook!</span>
                    <div id='login-form-container'>
                        <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Email&nbsp;
                                <span style={{color: '#ff3333', display: 'none'}} id="email-warning" className='form-text'></span>
                            </label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailStateChanged(true);
                                }} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Password&nbsp;
                                <span style={{color: '#ff3333', display: 'none'}} id="password-warning" className='form-text'>(Password should contain at least 5 characters)</span>
                            </label>
                            <input type="password" className="form-control" id="exampleInputPassword1"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordStateChanged(true);
                                }} />
                        </div>
                        {alertStates.displayAlert && <span style={{color: '#ff3333', display: 'block'}} id="" className='form-text my-2'>({alertStates.alertMessage})</span>}
                        <button disabled={loggingIn} type='submit' className="btn btn-primary" onClick={submitHandler} id="submit-btn" >
                            {loggingIn && <img style={{'width': '1rem'}} className='mx-2' src={progress} alt='No preview' />}Login
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
