import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginSuccessful() {
    let navigator = useNavigate()

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/token`).then((res) => {
            localStorage.setItem('token', res.data.token)
            navigator('/library')
        })
    }, [])

    return (
        <>
            <h1>Redirecting...</h1> 
        </>
    )
}