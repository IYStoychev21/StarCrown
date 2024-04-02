import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function LoginSuccessful() {
    let navigator = useNavigate()
    let [queryParam] = useSearchParams()

    useEffect(() => {
        localStorage.setItem('token', queryParam.get('token') as string)
        localStorage.setItem('refreshToken', queryParam.get('refresh') as string)

        navigator('/library')
    }, [])

    return (
        <>
            <h1>Redirecting...</h1> 
        </>
    )
}