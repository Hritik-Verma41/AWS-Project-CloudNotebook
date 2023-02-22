import React from 'react'

function Alert(props) {
    return (
        <div className="alert alert-danger" role="alert">
            ERROR - {props.errorCode}: {props.message}
        </div>
    )
}

export default Alert
