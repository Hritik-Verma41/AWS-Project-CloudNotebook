import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthGuard from './components/AuthGuard';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import About from './routes/About';
import Home from './routes/Home';
import Login from './routes/Login';
import Notes from './routes/Notes';
import Signup from './routes/Signup';
import LoggedInContext from './contexts/LoggedInContext';
import UserNameContext from './contexts/UserNameContext';
import AlertContext from './contexts/AlertContext';
import Note from './routes/Note';
import Footer from './components/Footer';

function App() {
  const [loggedIn, setLoggedIn] = useState((localStorage.getItem('auth-token')==='null' || localStorage.getItem('auth-token')===null)?false:true);
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [displayAlert, setDisplayAlert] = useState(false);
  const [errorCode, setErrorCode] = useState(0);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if(displayAlert) {
      setTimeout(() => {
        setDisplayAlert(false);
      }, 3000);
    }
  }, [displayAlert]);

  return (
    <LoggedInContext.Provider value={{loggedIn, setLoggedIn}}>
      <UserNameContext.Provider value={{userFirstName, userLastName, setUserFirstName, setUserLastName}}>  
        <AlertContext.Provider value={{displayAlert, errorCode, alertMessage, setDisplayAlert, setErrorCode, setAlertMessage}}>
          <Router>
            <Navbar/>
            {displayAlert && <Alert errorCode={errorCode} message={alertMessage} />}
            <Routes>
              <Route exact path='/' element={<Home/>} />
              <Route exact path='/about' element={<About/>} />
              <Route exact path='/login' element={<Login/>} />
              <Route exact path='/signup' element={<Signup/>} />
              <Route exact path='/notes' element={
                <AuthGuard>
                  <Notes/>
                </AuthGuard>
              } />
              <Route exact path='/notes/:id' element={
                <AuthGuard>
                  <Note/>
                </AuthGuard>
              } />
            </Routes>
            <Footer/>
          </Router>
        </AlertContext.Provider>
      </UserNameContext.Provider>
    </LoggedInContext.Provider>
  );
}

export default App;
