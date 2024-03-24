import Nav from '../components/Nav'
import { userAPI } from '@/apis/userAPI'
import { useState, useEffect } from 'react'
import { Separator } from '@/components/ui/separator'
import { User } from '@/shared.types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import NewGame from '@/components/NewGame'

export default function Library() {
    let [userInfo, setUserInfo] = useState<User>()
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(0)
    const [games, setGames] = useState([{"appid":2777010,"name":"The Thaumaturge: Digital Deluxe Content"},{"appid":2777020,"name":"WarSphere - The Worthy Branch"},{"appid":2777030,"name":"In The Shadows"},{"appid":2777050,"name":"Pyrene Demo"},{"appid":2777060,"name":"Impulse Rogue Demo"},{"appid":2777070,"name":"Medieval Questionnaire"},{"appid":2776090,"name":"Lay of the Land"},{"appid":2776100,"name":"Power Network Tycoon Demo"},{"appid":2776130,"name":"Wijita: City of Makers"},{"appid":2776140,"name":"Ctrl Alt Destroy Demo"},{"appid":2776170,"name":"Shores of Plunder Demo"}])

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

                    <div className='mt-20'>
                        <Dialog>
                            <DialogTrigger>
                                <NewGame />
                            </DialogTrigger>
                            <DialogContent className='dark'>
                                <DialogHeader>
                                    <DialogTitle className='text-white'>Add New Game</DialogTitle>
                                    <DialogDescription>Choose a game to add to your library</DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>

                    </div>
                </div>
            </div>
        </>
    )
}