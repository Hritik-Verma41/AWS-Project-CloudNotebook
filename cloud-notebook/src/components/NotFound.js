import React from 'react'
import noteFoundImage from './not_found.png';

function NotFound() {
    return (
        <div style={{
            'display': 'flex',
            'alignItems': 'center',
            'flexDirection': 'column',
            'justifyContent': 'center'
        }} >
            <img src={noteFoundImage} style={{
                'width': '25%',
                'marginTop': '1rem'
            }} alt="No preview" />
        </div>
    )
}

export default NotFound
