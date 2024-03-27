
export const axiosConfig = {
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Authorization': localStorage.getItem('token')
    }
}

export const axiosGoogleConfig = {
    baseURL: "http://localhost:28027",
    headers: {
        'Authorization': localStorage.getItem('token')
    }
}