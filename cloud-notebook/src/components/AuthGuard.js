import { Navigate } from "react-router-dom";

let checkToken = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
        }
    };
    try {
        let response = await fetch('/api/auth/getuser', requestOptions);
        if(response.status===200)
            return true;
        else
            return false;
    } catch(err) {
        console.log(err);
        return false;
    }
}

export default function AuthGuard({children}) {
    if(localStorage.getItem('auth-token') === null) {
        return <Navigate to="/login" />
    } else if(localStorage.getItem('auth-token') === 'null') {
        return <Navigate to="/login" />
    } else if(!checkToken()) {
        return <Navigate to="/login" />
    } else {
        return children;
    }
}
