import React, { useState } from 'react'
import editIcon from './edit_icon.png'
import './EditTitleModal.css'

function EditTitleModal(props) {
    const [title, setTitle] = useState('');
    const [titleStateChanged, setTitleStateChanged] = useState(false);
    const [updating, setUpdating] = useState(false);

    const editTitleHandler = async () => {
        setUpdating(true);
        const data = {
            title: title
        }
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify(data)
            };
            await fetch(`http://localhost:5001/notes/updatetitle/${props.id}`, requestOptions);
        } catch(err) {
            console.log(err);
        }
        window.location.reload();
    };

    return (
        <div>
            <img id='title-edit-icon' src={editIcon} alt="No preview!" data-bs-toggle="modal" data-bs-target="#editTitleModal" />

            <div className="modal fade" id="editTitleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Title</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                <span style={{color: '#ff3333'}} className='form-text'>
                                    *&nbsp;
                                </span>
                                Title&nbsp;
                                <span style={{color: '#ff3333', display: (titleStateChanged && title.length === 0)?'inline':'none'}} className='form-text'>
                                    *Field can't be empty
                                </span>
                            </label>
                            <input type="text" className="form-control" id="title" onChange={(e) => {
                                setTitleStateChanged(true);
                                setTitle(e.target.value);
                            }} />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button disabled={updating} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button disabled={updating || title.length===0} type="button" className="btn btn-primary" onClick={editTitleHandler}>{updating?'Updating':'Update'}</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default EditTitleModal
