import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react';
import EditTitleModal from '../components/EditTitleModal';
import dateIcon from '../components/date_icon.png'
import deleteIcon from '../components/delete_icon.png';
import AlertContext from '../contexts/AlertContext';
import EditDescModal from '../components/EditDescModal';
import Spinner from '../components/Spinner';
import NotFound from '../components/NotFound';
import './Note.css';

function Note() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [note, setNote] = useState({});
    const [deleting, setDeleting] = useState(false);
    const alertStates = useContext(AlertContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            setLoading(true)
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'auth-token': localStorage.getItem('auth-token')
                    }
                };
                let response = await fetch(`http://localhost:5001/notes/getnote/${id}`, requestOptions);
                if(response.status !== 200) {
                    setLoading(false);
                    setNotFound(true);
                    return;
                }
                await response.json().then(data => setNote(data));
            } catch(err) {
                alertStates.setErrorCode(500);
                alertStates.setAlertMessage("Can't connect to the server!");
                alertStates.setDisplayAlert(true);
                console.log(err);
            }
            setLoading(false);
        }
        fetchNote();
        // eslint-disable-next-line
    }, []);

    const deleteNoteHandler = async () => {
        setDeleting(true);
        try{
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            };
            let response = await fetch(`http://localhost:5001/notes/deletenote/${note._id}`, requestOptions);
            if(response.status === 200) {
                navigate('/notes');
            }
        } catch(err) {
            alertStates.setErrorCode(500);
            alertStates.setAlertMessage("Can't connect to the server!");
            alertStates.setDisplayAlert(true);
            setDeleting(false);
            console.log(err);
        }
    }

    return (
        <div id='note-container'>
            <div id='note-primary'>
                <div id="note-main-container">
                    {loading && <Spinner/>}
                    {!loading && notFound && <NotFound/> }
                    {note.title && <div id="note-title-div">
                        <h5 id="note-title" className="card-title">Title:&nbsp;{note.title}</h5><EditTitleModal id={note._id} />
                    </div>}
                    {note.date && <div id="note-date-div">
                        <img id="note-date-icon" src={dateIcon} alt="No preview!" />
                        <span id="note-date" className="form-text">{new Date(note.date).toLocaleString({timeZone: 'Asia/Kolkata'})}</span>
                    </div>}
                    {note.title && <button id="note-delete-btn" disabled={deleting} className='btn btn-danger' onClick={deleteNoteHandler} ><img id="note-delete-icon" src={deleteIcon} alt="No preview icon!" />&nbsp;{deleting?'Deleting':'Delete'}</button>}
                    {note.title && <div id="note-desc-div">
                        <h5 id='note-desc' className="card-text">Description:</h5><EditDescModal id={note._id} />
                    </div>}
                    {note.title && <hr id="section-hr" />}
                    <div id="note-body">
                        {note.description}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Note
