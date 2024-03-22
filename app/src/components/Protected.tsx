import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function Protected({children}: any) { 
    let [isLoggedIn, setIsLoggedIn] = useState(true);
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth`, {withCredentials: true}).then(() => {
            setIsLoggedIn(true)
        }).catch(() => {
            setIsLoggedIn(false)
        })
    }, [])
    
    if(!isLoggedIn)
        return <Navigate to="/"/>


    return children
}