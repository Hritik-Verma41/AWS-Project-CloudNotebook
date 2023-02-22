import React from 'react'
import { Link } from 'react-router-dom';
import appLogo from '../main_icon.png';
import devImage from '../dev_image.jpg';
import './About.css'

function About() {
    document.title = 'Cloud Notebook | About';
    
    return (
        <div id="about-main-container">
            <div id="about-content-container">
                <div id="about-app-div">
                    <div id="about-app-desc" className='lead'>
                        <h1 className="about-title">What is Cloud Notebook?</h1>
                        Cloud notebook is a free cloud plateform where you can save all your notes safe without the risk of data loss.
                        <br/>
                        Cloud Notebook ensures your data to be safe and secure with end to end encryption.
                        <br/>
                        <Link id="about-signup" to="/signup">
                            <span><strong>Join Now!</strong></span>
                        </Link>
                    </div>
                    <div id="about-app-logo">
                        <img src={appLogo} alt="No preview" />
                    </div>
                </div>
                <div id="about-dev-div">
                    <div id="about-dev-logo">
                        <img src={devImage} alt="No preview" />
                    </div>
                    <div id="about-dev-desc" className='lead'>
                        <h1 className="about-title">About the Developer</h1>
                        <p id="dev-name">Hritik Verma</p>
                        <p id="dev-qualification">B. Tech in Computer Science and Enginnnering</p>
                        <p id="dev-college">Naula Institute of Technology (Grad. Year: 2024)</p>
                        <hr id="dev-section" />
                        <p id="dev-handles">Contact the developer</p>
                        <div id="dev-handles-div">
                            <a href="mailto:41hritik@gmail.com">
                                <i className="fas fa-envelope-open"/>
                                41hritik@gmail.com
                            </a>
                            <a href="https://www.linkedin.com/in/hritikverma41/">
                                <i className="fab fa-linkedin"></i>
                                hritikverma41
                            </a>
                            <a href="https://github.com/Hritik-Verma41">
                                <i className="fab fa-github"></i>
                                hritik-verma41
                            </a>
                            <a href="tel:8292531227">
                                <i className="fas fa-phone-alt"></i>
                                +91 82925 31227
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
