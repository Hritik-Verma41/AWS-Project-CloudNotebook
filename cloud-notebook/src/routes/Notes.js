import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useContext } from 'react';
import AddNewNoteModal from '../components/AddNewNoteModal';
import NoteListItem from '../components/NoteListItem';
import Spinner from '../components/Spinner';
import AlertContext from '../contexts/AlertContext';
import './Notes.css'

function Notes() {
    document.title = 'Cloud Notebook | Notes';

    const [notes, setNotes] = useState([])
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalResults, setTotalResults] = useState(0);

    const alertStates = useContext(AlertContext);

    
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'auth-token': localStorage.getItem('auth-token')
                    }
                };
                let response = await fetch(`/api/notes/getnotes?page=${page}`, requestOptions);
                await response.json().then(data => {
                    setNotes(data.notes);
                    setTotalResults(data.totalResults);
                });
            } catch(err) {
                alertStates.setErrorCode(500);
                alertStates.setAlertMessage("Can't connect to the server!");
                alertStates.setDisplayAlert(true);
                console.log(err);
            }
            setLoading(false);
        }
        fetchNotes();
        // eslint-disable-next-line
    }, []);
    
    let fetchMoreNotes = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            }
        };
        try {
            let response = await fetch(`/api/notes/getnotes?page=${page+1}`, requestOptions);
            setPage(page+1);
            await response.json().then(data => {
                let newNotes = notes.concat(data.notes);
                setNotes(newNotes);
            });
        } catch(err) {
            alertStates.setErrorCode(500);
            alertStates.setAlertMessage("Can't connect to the server!");
            alertStates.setDisplayAlert(true);
            console.log(err);
        }
    };
    
    return (
        <div id='notes-container'>
            <div id='notes-primary'>
                <div id="title-container">
                    <h1>Your Notes</h1>
                    <div id="modal-btn-container">
                        <AddNewNoteModal/>
                    </div>
                </div>
                <div id="notes-list-container">
                    <div id="notes-list">
                        {loading && <Spinner/>}
                        {!loading && totalResults===0 && <span style={{
                            'alignSelf': 'center',
                            'fontSize': '1.2rem'
                        }} > No notes found!</span>}
                        <InfiniteScroll
                            dataLength={notes.length}
                            next={fetchMoreNotes}
                            hasMore={notes.length!==totalResults}
                            loader={<Spinner/>}
                            scrollableTarget="notes-list"
                        >
                            {notes.map((note) => {
                                return <NoteListItem key={note._id} note={note} />
                            })}
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notes
