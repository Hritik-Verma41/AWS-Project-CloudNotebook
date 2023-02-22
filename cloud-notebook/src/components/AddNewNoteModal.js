import React, { useState } from 'react'
import './AddNewNoteModal.css'

function AddNewNoteModal() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [adding, setAdding] = useState(false);
    const [titleStatechanged, setTitleStatechanged] = useState(false);
    const [descStateChanged, setDescStateChanged] = useState(false);

    const addButtonHandler = async () => {
        setAdding(true);
        let data = {
            title: title,
            description: description
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
            await fetch('http://localhost:5001/notes/addnote', requestOptions);
        } catch(err) {
            console.log(err);
        }
        window.location.reload();
    }

    return (
        <div>
            <button type="button" id="add-new-btn" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#newNoteModal">
                Add New Note
            </button>

            <div className="modal fade" id="newNoteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add a new note</h5>
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
                            <span style={{color: '#ff3333', display: (titleStatechanged && title.length === 0)?'inline':'none'}} className='form-text'>
                                *Field can't be empty
                            </span>
                        </label>
                        <input type="text" className="form-control" id="title" onChange={(e) => {
                            setTitleStatechanged(true);
                            setTitle(e.target.value);
                        }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">
                            <span style={{color: '#ff3333'}} className='form-text'>
                                *&nbsp;
                            </span>
                            Description&nbsp;
                            <span style={{color: '#ff3333', display: (descStateChanged && description.length === 0)?'inline':'none'}} className='form-text'>
                                *Field can't be empty
                            </span>
                        </label>
                        <textarea style={{'resize': 'none', 'height': '15rem'}} className="form-control" id="desc" onChange={(e) => {
                            setDescStateChanged(true);
                            setDescription(e.target.value);
                        }} />
                    </div>
                </form>
                </div>
                <div className="modal-footer">
                    <button disabled={adding} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button disabled={adding || title.length===0 || description.length===0} type="button" className="btn btn-primary" onClick={addButtonHandler}>{adding?'Adding':'Add'}</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default AddNewNoteModal
