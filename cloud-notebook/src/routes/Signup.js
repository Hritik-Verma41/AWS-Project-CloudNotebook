import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoggedInContext from '../contexts/LoggedInContext';
import './Signup.css'
import progress from '../in_progress.gif';
import AlertContext from '../contexts/AlertContext';

function Signup() {
    document.title = 'Cloud Notebook | Sign Up';

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPswd, setReEnterPswd] = useState('');
    const [firstNameStateChanged, setFirstNameStateChanged] = useState(false);
    const [lastNameStateChanged, setLastNameStateChanged] = useState(false);
    const [emailStateChanged, setEmailStateChanged] = useState(false);
    const [passwordStateChanged, setPasswordStateChanged] = useState(false);
    const [reEnterPswdStateChanged, setReEnterPswdStateChanged] = useState(false);
    const [firstNameValid, setFirstNameValid] = useState(false);
    const [lastNameValid, setLastNameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [reEnterPswdValid, setReEnterPswdValid] = useState(false);
    const [signingUp, setSigningUp] = useState(false);
    
    const loggedInState = useContext(LoggedInContext);
    const alertStates = useContext(AlertContext);

    const navigate = useNavigate();

    const submitHandler = async () => {
        alertStates.setDisplayAlert(false);
        let isUnmount = false;
        if(!isUnmount) {
            setSigningUp(true);
        }
        let data = {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        try {
            let response = await fetch('/api/auth/signup', requestOptions);
            localStorage.setItem('auth-token', response.headers.get('auth-token'));
            if(response.status === 200) {
                loggedInState.setLoggedIn(true);
                isUnmount = true;
                navigate('/notes');
            } else {
                loggedInState.setLoggedIn(false);
                setSigningUp(false);
                isUnmount = true;
                alertStates.setErrorCode(400);
                alertStates.setAlertMessage('An account with same email already exists!');
                alertStates.setDisplayAlert(true);
            }
        } catch(err) {
            console.log(err);
            setSigningUp(false);
            isUnmount = true;
            alertStates.setErrorCode(500);
            alertStates.setAlertMessage("Can't connect to the server!");
            alertStates.setDisplayAlert(true);
        }
        if(!isUnmount) {
            setSigningUp(false);
        }
    }

    useEffect(() => {
        if(firstName.length === 0 && firstNameStateChanged) {
            document.getElementById('first-name-warning').style.display = 'inline';
            document.getElementById('first-name-warning').innerHTML = '(Field cannot be empty)';
            setFirstNameValid(false);
        } else if(firstName.length > 20 && firstNameStateChanged) {
            document.getElementById('first-name-warning').style.display = 'inline';
            document.getElementById('first-name-warning').innerHTML = '(Cannot be more than 20 characters)';
            setFirstNameValid(false);
        } else {
            document.getElementById('first-name-warning').style.display = 'none';
            setFirstNameValid(true);
        }
    }, [firstName, firstNameStateChanged]);
    
    useEffect(() => {
        if(lastName.length === 0 && lastNameStateChanged) {
            document.getElementById('last-name-warning').style.display = 'inline';
            document.getElementById('last-name-warning').innerHTML = '(Field cannot be empty)';
            setLastNameValid(false);
        } else if(lastName.length > 20 && lastNameStateChanged) {
            document.getElementById('last-name-warning').style.display = 'inline';
            document.getElementById('last-name-warning').innerHTML = '(Cannot be more than 20 characters)';
            setLastNameValid(false);
        } else {
            document.getElementById('last-name-warning').style.display = 'none';
            setLastNameValid(true);
        }
    }, [lastName, lastNameStateChanged]);

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
        if(reEnterPswd !== password && reEnterPswdStateChanged) {
            document.getElementById('re-enter-password-warning').style.display = 'inline';
            setReEnterPswdValid(false);
        } else {
            document.getElementById('re-enter-password-warning').style.display = 'none';
            setReEnterPswdValid(true);
        }
    }, [reEnterPswd, password, reEnterPswdStateChanged]);

    useEffect(() => {
        if(firstNameValid && lastNameValid && emailValid && passwordValid && reEnterPswdValid && firstName.length!==0 && lastName.length !== 0 && email.length!==0 && password.length!==0 && reEnterPswd.length !== 0) {
            document.getElementById('submit-btn').disabled = false;
        } else {
            document.getElementById('submit-btn').disabled = true;
        }
    }, [firstNameValid, lastNameValid, emailValid, passwordValid, reEnterPswdValid, firstName, lastName, email, password, reEnterPswd]);

    return (
        <div id='signup-primary'>
            <div id='signup-primary-content' className='container'>
                <h1>SignUp to Cloud Notebook</h1>
                <span>Get your free account on Cloud Notebook now!</span>
                <div id='signup-form-container'>
                    <form>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                            First Name&nbsp;
                            <span style={{color: '#ff3333', display: 'none'}} id="first-name-warning" className='form-text'></span>
                        </label>
                        <input type="text" className="form-control" id="firstName" aria-describedby="emailHelp"
                            onChange={(e) => {
                                setFirstName(e.target.value);
                                setFirstNameStateChanged(true);
                            }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                            Last Name&nbsp;
                            <span style={{color: '#ff3333', display: 'none'}} id="last-name-warning" className='form-text'></span>
                        </label>
                        <input type="text" className="form-control" id="lastName" aria-describedby="emailHelp"
                            onChange={(e) => {
                                setLastName(e.target.value);
                                setLastNameStateChanged(true);
                            }} />
                    </div>
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
                            Enter a new Password&nbsp;
                            <span style={{color: '#ff3333', display: 'none'}} id="password-warning" className='form-text'>(Password should contain at least 5 characters)</span>
                        </label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordStateChanged(true);
                            }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword2" className="form-label">
                            Re-enter Password&nbsp;
                            <span style={{color: '#ff3333', display: 'none'}} id="re-enter-password-warning" className='form-text'>(Passwords doesn't match)</span>
                        </label>
                        <input type="password" className="form-control" id="exampleInputPassword2"
                            onChange={(e) => {
                                setReEnterPswd(e.target.value);
                                setReEnterPswdStateChanged(true);
                            }} />
                    </div>
                    {alertStates.displayAlert && <span style={{color: '#ff3333', display: 'block'}} id="" className='form-text my-2'>({alertStates.alertMessage})</span>}
                    <button disabled={signingUp} type='submit' className="btn btn-primary" onClick={submitHandler} id="submit-btn" >
                        {signingUp && <img style={{'width': '1rem'}} className='mx-2' src={progress} alt='No preview' />}Sign Up
                    </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
