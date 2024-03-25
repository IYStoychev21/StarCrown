import { useState, useEffect } from "react"
import { gamesAPI } from "@/apis/gamesAPI"

export default function GameSave({ clickHandler, gameId}: { clickHandler: () => void, gameId: number}){
    const [isHovered, setIsHovered] = useState(false)
    const [gamePoster, setGamePoster] = useState<string>('')
    const [gameTitle, setGameTitle] = useState<string>('')

    useEffect(() => {
        gamesAPI.getGameDetails(gameId).then((game) => {
            setGamePoster(game.header_image)
            setGameTitle(game.name)
        })
    }, [])

    return (
        <>
            <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={clickHandler} className={`w-[230px] h-[107px] relative flex justify-center items-center rounded-sm cursor-pointer`}>
                <img className="rounded-sm absolute" src={gamePoster} alt="" />
                <div className="absolute top-0 left-0 w-full h-full z-10 bg-[#00000080] hover:opacity-100 duration-150 opacity-0 rounded-sm"></div>
                {isHovered && <h1 className="relative z-20 text-center">{gameTitle}</h1>}
            </div>
        </>
    )
}