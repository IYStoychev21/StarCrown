import Nav from '../components/Nav'
import { userAPI } from '@/apis/userAPI'
import { useState, useEffect } from 'react'

export default function Library() {
    let [userName, setUserName] = useState('')
    let [avatarImage, setAvatarImage] = useState('')

    useEffect(() => {
        userAPI.getCurrentUser().then((user) => {
            setUserName(user.name)
            setAvatarImage(user.pic)
        })
    }, [])

    return (
        <>
            <div className='min-w-screen min-h-screen flex flex-col'>
                <Nav avaratImage={avatarImage} userName={userName}/>
            </div>
        </>
    )
}