import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AlertContext from '../contexts/AlertContext';
import LoggedInContext from '../contexts/LoggedInContext';
import UserNameContext from '../contexts/UserNameContext';
import './Navbar.css';

function Navbar() {
    const [path, setPath] = useState('/');
    const navigate = useNavigate();

    let location = useLocation();
    let loggedInState = useContext(LoggedInContext);
    let userNameStates = useContext(UserNameContext);
    let alertStates = useContext(AlertContext);

    useEffect(() => {
        setPath(location.pathname)
    }, [location]);

    const logOutHandler = () => {
        localStorage.removeItem('auth-token');
        loggedInState.setLoggedIn(false);
        navigate('/');
    };

    useEffect(() => {
        if(loggedInState.loggedIn) {
            document.getElementById('signout-btn-div').style.display = 'inline';
            document.getElementById('sigin-up-btn-div').style.display = 'none';
        } else {
            document.getElementById('signout-btn-div').style.display = 'none';
            document.getElementById('sigin-up-btn-div').style.display = 'inline';
        }
    }, [loggedInState]);

    useEffect(() => {
        if(loggedInState.loggedIn) {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                }
            };
            fetch('/api/auth/getuser', requestOptions)
                .then(response => {
                    response.json().then(data => {
                        userNameStates.setUserFirstName(data.first_name);
                        userNameStates.setUserLastName(data.last_name);
                    })
                })
                .catch(err => console.log(err));
        } else {
            userNameStates.setUserFirstName('');
            userNameStates.setUserLastName('');
        }
    }, [loggedInState, userNameStates]);

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Cloud Notebook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className={`nav-link ${path==='/'?'active':''}`} to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${path==='/notes'?'active':''}`} to="/notes">Notes</Link>
                </li>
            </ul>
            {loggedInState.loggedIn && <><hr/><span id="user-name-span" className="navbar-brand">{`${userNameStates.userFirstName} ${userNameStates.userLastName}`}</span></>}
            <div id='sigin-up-btn-div'>
                <Link to='/login'>
                    <button type="button" className="btn btn-outline-primary" onClick={() => alertStates.setDisplayAlert(false)} >Login</button>
                </Link>
                <Link to='/signup'>
                    <button type="button" className="btn btn-outline-secondary mx-2" onClick={() => alertStates.setDisplayAlert(false)} >Sign Up</button>
                </Link>
            </div>
            <div id='signout-btn-div'>
                <button type="button" className="btn btn-outline-primary" onClick={logOutHandler}>Log Out</button>
            </div>
            </div>
        </div>
        </nav>  
        </>
    )
}

export default Navbar
