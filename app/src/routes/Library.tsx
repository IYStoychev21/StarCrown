import Nav from '../components/Nav'
import { userAPI } from '@/apis/userAPI'
import { useState, useEffect } from 'react'
import { Separator } from '@/components/ui/separator'
import { User } from '@/shared.types'

export default function Library() {
    let [userInfo, setUserInfo] = useState<User>()

    useEffect(() => {
        userAPI.getCurrentUser().then((user) => {
            setUserInfo(user)
        })
    }, [])

    return (
        <>
            <div className='min-w-screen min-h-screen flex flex-col'>
                <Nav avaratImage={userInfo?.pic} userName={userInfo?.name}/>

                <div className='w-full flex justify-center'>
                    <Separator className='w-[95%] bg-slate-500' />
                </div>

                <div className='text-white font-bold ml-8 mt-3 flex flex-col gap3'>
                    <h1 className='text-3xl'>Your Library</h1>
                </div>
            </div>
        </>
    )
}