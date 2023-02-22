import React, { useState } from 'react'
import editIcon from './edit_icon.png'
import './EditDescModal.css'

function EditDescModal(props) {
    const [desc, setDesc] = useState('');
    const [descStateChanged, setDescStateChanged] = useState(false);
    const [updating, setUpdating] = useState(false);

    const editDescHandler = async () => {
        setUpdating(true);
        const data = {
            description: desc
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
            await fetch(`http://localhost:5001/notes/updatedescription/${props.id}`, requestOptions);
        } catch(err) {
            console.log(err);
        }
        window.location.reload();
    };

    return (
        <div>
            <img id='desc-edit-icon' src={editIcon} alt="No preview!" data-bs-toggle="modal" data-bs-target="#editDescModal" />

            <div className="modal fade" id="editDescModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Description</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="desc" className="form-label">
                                <span style={{color: '#ff3333'}} className='form-text'>
                                    *&nbsp;
                                </span>
                                Description&nbsp;
                                <span style={{color: '#ff3333', display: (descStateChanged && desc.length === 0)?'inline':'none'}} className='form-text'>
                                    *Field can't be empty
                                </span>
                            </label>
                            <textarea style={{'resize': 'none', 'height': '15rem'}} className="form-control" id="desc" onChange={(e) => {
                                setDescStateChanged(true);
                                setDesc(e.target.value);
                            }} />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button disabled={updating} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button disabled={updating || desc.length===0} type="button" className="btn btn-primary" onClick={editDescHandler}>{updating?'Updating':'Update'}</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default EditDescModal
