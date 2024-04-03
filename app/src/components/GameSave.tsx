import { useState, useEffect } from "react"
import { gamesAPI } from "@/apis/gamesAPI"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "./ui/button"

export default function GameSave({ gameId, removeGame }: { gameId: number, removeGame: () => void }) {
    const [isHovered, setIsHovered] = useState(false)
    const [gamePoster, setGamePoster] = useState<string>('')
    const [gameTitle, setGameTitle] = useState<string>('')
    const [gameDescription, setGameDescription] = useState<string>('')

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    useEffect(() => {
        gamesAPI.getGameDetails(gameId).then((game) => {
            setGamePoster(game.header_image)
            setGameTitle(game.name)
            setGameDescription(game.short_description)
        })
    }, [])

    return (
        <>
            <div onMouseEnter={() => setIsHovered(true)} onClick={() => {setIsDrawerOpen(true)}} onMouseLeave={() => setIsHovered(false)} className={`w-[230px] h-[107px] relative flex justify-center items-center rounded-sm cursor-pointer`}>
                <img className="rounded-sm absolute" src={gamePoster} alt="" />
                <div className="absolute top-0 left-0 w-full h-full z-10 bg-[#00000080] hover:opacity-100 duration-150 opacity-0 rounded-sm"></div>
                {isHovered && <h1 className="relative z-20 text-center">{gameTitle}</h1>}
            </div>

            <Drawer open={isDrawerOpen}>
                <DrawerContent className="dark text-white">

                    <div className="flex">
                        <img src={gamePoster} className="w-1/3 h-full" alt="" />
                        <div className="w-full flex flex-col justify-center items-center">
                            <DrawerHeader>
                                <DrawerTitle>{gameTitle}</DrawerTitle>
                                <DrawerDescription className="w-[90ch]">{gameDescription}</DrawerDescription>
                            </DrawerHeader>

                        </div>
                    </div>

                    <DrawerFooter className="w-full flex flex-col justify-center items-center mt-4">
                        {/* <Button className="w-1/2" >Change Location</Button> */}
                        <Button className="w-1/2" variant="destructive" onClick={removeGame}>Remove Game</Button>
                        <Button className="w-1/2" onClick={() => setIsDrawerOpen(false)}>Close</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}