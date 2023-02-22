import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="text-center text-lg-start bg-dark text-muted">
            <section
                className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
            >
                <div className="me-5 d-none d-lg-block">
                    <span>Get connected with us on social networks:</span>
                </div>
                
                <div>
                    <a href="mailto:41hritik@gmail.com" className="me-4 text-reset">
                        <i className="fas fa-envelope-open"/>
                    </a>
                    <a href="https://www.linkedin.com/in/hritikverma41/" className="me-4 text-reset">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="https://github.com/Hritik-Verma41" className="me-4 text-reset">
                        <i className="fab fa-github"></i>
                    </a>
                </div>
            </section>
            
            <section className="">
                <div className="container text-center text-md-start mt-5">
                <div className="row mt-3">
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">
                        Cloud Notebook
                    </h6>
                    <p>
                        Cloud Notebook is a free cloud service which facilitates you to
                        store your notes safe and secure on cloud. The plateform uses end
                        to end encryption to keep your passwords safe.
                    </p>
                    </div>
                    
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">
                        Navigate
                    </h6>
                    <p>
                        <Link to="/" className="text-reset">Home</Link>
                    </p>
                    <p>
                        <Link to="/login" className="text-reset">Log In</Link>
                    </p>
                    <p>
                        <Link to="/signup" className="text-reset">Sign Up</Link>
                    </p>
                    <p>
                        <Link to="/notes" className="text-reset">Notes</Link>
                    </p>
                    </div>
                    
                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">
                        Build Upon
                    </h6>
                    <p>
                        <a href="https://reactjs.org/" className="text-reset">React.js</a>
                    </p>
                    <p>
                        <a href="https://nodejs.org/en/" className="text-reset">Node.js</a>
                    </p>
                    <p>
                        <a href="https://getbootstrap.com/" className="text-reset">Bootstrap</a>
                    </p>
                    <p>
                        <a href="https://fontawesome.com/" className="text-reset">Font Awesome</a>
                    </p>
                    </div>
                    
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">
                        Contact
                    </h6>
                    <p><i className="fas fa-home me-3"></i> Patna, Bihar, IN</p>
                    <p>
                        <a href="mailto:41hritik@gmail.com" className="text-reset" style={{'textDecoration': 'none'}}>
                            <i className="fas fa-envelope me-3"></i>
                            41hritik@gmail.com
                        </a>
                    </p>
                    <p>
                        <a href="https://www.linkedin.com/in/hritikverma41/" className="text-reset" style={{'textDecoration': 'none'}}>
                            <i className="fab fa-linkedin me-3"></i>
                            hritikverma41
                        </a>
                    </p>
                    <p>
                        <a href="tel:8292531227" className="text-reset" style={{'textDecoration': 'none'}}>
                        <i className="fas fa-phone-alt me-3"></i>
                            +91 82925 31227
                        </a>
                    </p>
                    </div>
                </div>
                </div>
            </section>
            
            <div className="text-center p-4" style={{'backgroundColor': 'rgba(0, 0, 0, 0.05)'}}>
                © 2021 Copyright:&nbsp;
                <Link className="text-reset fw-bold" to="/">cloudnotebook.com</Link>
            </div>
        </footer>
    )
}

export default Footer
