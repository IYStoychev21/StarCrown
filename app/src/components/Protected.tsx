import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { userAPI } from '../apis/userAPI';

export default function Protected({children}: any) { 
    let [isLoggedIn, setIsLoggedIn] = useState(true);
    
    useEffect(() => { 
        userAPI.getCurrentUser().then(() => {
            setIsLoggedIn(true)
        }).catch(() => {
            setIsLoggedIn(false)
        })
    }, [])
    
    if(!isLoggedIn)
        return <Navigate to="/"/>


    return children
}