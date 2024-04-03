import { UserType } from "@/shared.types"
import { Avatar, AvatarImage } from "./ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { userAPI } from "@/apis/userAPI"
import { useNavigate } from "react-router-dom"

export default function Profile({ user }: {user: UserType | undefined}) {
    const navigate = useNavigate()

    function handleLogOut() {
        userAPI.logOut().then(() => {
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            
            navigate('/')
        })
    }

    return (
        <>
            <div className="text-white fixed left-8 bottom-8 hover:scale-105 duration-150 cursor-pointer active:scale-100">
                <Sheet>
                    <SheetTrigger>
                        <Avatar className="w-[64px] h-[64px]">
                            <AvatarImage className="w-full" src={user?.pic}/>
                        </Avatar>
                    </SheetTrigger>

                    <SheetContent className="dark text-white">
                        <SheetTitle className="text-2xl">Profile</SheetTitle>
                        
                        <div className="flex flex-col gap-5">
                            <div className="flex justify-center">
                                <Avatar className="w-[256px] h-[256px]">
                                    <AvatarImage className="w-full" src={`${user?.pic.slice(0, user.pic.length - 4)}256-c`}/>
                                </Avatar>
                            </div>
                            <div className="text-xl">
                                <p>{user?.first}</p>
                                <p>{user?.last}</p>
                                <p>{user?.name}</p>
                                <p>{user?.email}</p>
                            </div>

                            <Button onClick={handleLogOut} variant="destructive">Log Out</Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}