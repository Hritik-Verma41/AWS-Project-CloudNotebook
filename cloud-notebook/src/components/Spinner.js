import React from 'react'
import spinner from './spinner.gif';
import './Spinner.css'

function Spinner() {
    return (
        <div id='spinner-container'>
            <img id="spinner" src={spinner} alt='No preview' />
        </div>
    )
}

export default Spinner
