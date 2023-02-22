import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EditDescModal from './EditDescModal'
import EditTitleModal from './EditTitleModal'
import deleteIcon from './delete_icon.png'
import dateIcon from'./date_icon.png'
import './NoteListItem.css'
import { useContext } from 'react'
import AlertContext from '../contexts/AlertContext'

function NoteListItem(props) {
    const [deleting, setDeleting] = useState(false);
    const alertStates = useContext(AlertContext);

    const deleteNoteHandler = async () => {
        setDeleting(true);
        try{
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            };
            await fetch(`/api/notes/deletenote/${props.note._id}`, requestOptions);
        } catch(err) {
            alertStates.setErrorCode(500);
            alertStates.setAlertMessage("Can't connect to the server!");
            alertStates.setDisplayAlert(true);
            console.log(err);
        }
        window.location.reload();
    }

    return (
        <div className="card my-2 mx-1">
            <div className="card-body">
                <div id="title-div">
                    <h5 id="title" className="card-title">Title:&nbsp;{props.note.title}</h5><EditTitleModal id={props.note._id} />
                </div>
                <div id="desc-div">
                    <p id='desc' className="card-text">Description:&nbsp;{props.note.description}</p><EditDescModal id={props.note._id} />
                </div>
                <div id="date-div">
                    <img id="date-icon" src={dateIcon} alt="No preview!" />
                    <span id="date" className="form-text">{new Date(props.note.date).toLocaleString({timeZone: 'Asia/Kolkata'})}</span>
                </div>
                <Link to={`/notes/${props.note._id}`} id="view-note-btn" className="btn btn-outline-danger">View Note</Link>
                <button disabled={deleting} id="delete-btn" className='btn btn-danger mx-2' onClick={deleteNoteHandler} ><img id="delete-icon" src={deleteIcon} alt="No preview icon!" />&nbsp;{deleting?'Deleting':'Delete'}</button>
            </div>
        </div>
    )
}

export default NoteListItem
