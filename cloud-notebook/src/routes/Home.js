import React from 'react'
import { Link } from 'react-router-dom';
import './Home.css'
import main_icon from '../main_icon.png'
import { useContext } from 'react';
import AlertContext from '../contexts/AlertContext';

function Home() {
    document.title = 'Cloud Notebook | Home';

    const alertStates = useContext(AlertContext);

    return (
        <div style={{'minHeight': '83vh'}}>
            <div id="home-primary" className='container'>
                <div id="home-primary-content">
                    <h1>Keep your notes safe and secure with Cloud Notebook</h1>
                    <p className='lead mb-4'>
                        Cloud notebook is a free cloud plateform where you can save all your notes safe without the risk of data loss.
                        <br/>
                        Cloud Notebook ensures your data to be safe and secure with end to end encryption.
                        <br/>
                        <span>Join Now!</span>
                    </p>
                    <div id='btn-container'>
                        <Link to="/login">
                            <button type="button" className="btn btn-primary btn-lg" onClick={() => alertStates.setDisplayAlert(false)} >Login</button>
                        </Link>
                        <Link to="/signup">
                            <button type="button" className="btn btn-outline-secondary btn-lg mx-2" onClick={() => alertStates.setDisplayAlert(false)} >Sign Up</button>
                        </Link>
                    </div>
                </div>
                <div id="home-logo-content">
                    <img src={main_icon} alt="No preview available" />
                </div>
            </div>
        </div>
    )
}

export default Home
