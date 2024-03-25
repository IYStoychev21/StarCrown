import { userAPI } from '@/apis/userAPI'
import { gamesAPI } from '@/apis/gamesAPI'
import { useState, useEffect } from 'react'
import { UserType, GameType, GameSaveType} from '@/shared.types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import NewGame from '@/components/NewGame'
import { Input } from '@/components/ui/input'
import { open } from '@tauri-apps/api/dialog'
import { Button } from '@/components/ui/button'
import { readTextFile, BaseDirectory, writeTextFile } from '@tauri-apps/api/fs'
import GameSave from '@/components/GameSave'
import { convertNumberToCol } from '@/utils/numToCol'

export default function Library() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [userInfo, setUserInfo] = useState<UserType>()
    const [allGames, setAllGames] = useState<GameType[]>([])

    const [nameValue, setNameValue] = useState('')
    const [suggestedGames, setSuggestedGames] = useState([])

    const [idValue, setIdValue] = useState(0)

    const [showGameSuggestion, setShowGameSuggestion] = useState(false)

    const [gameSavesPath, setGameSavesPath] = useState('')

    const [games, setGames] = useState<GameSaveType[]>([])

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            setIsDialogOpen(false)
        }
    })

    useEffect(() => {
        userAPI.getCurrentUser().then((user) => {
            setUserInfo(user)
        })

        gamesAPI.getGames().then((games: any) => {
            setAllGames(games)
        })

        readTextFile('StarCrown/library.json', { dir: BaseDirectory.Document }).then((data) => {
            setGames(JSON.parse(data))
        })
    }, [])

    useEffect(() => {
        writeTextFile('StarCrown/library.json', JSON.stringify(games), { dir: BaseDirectory.Document })
        setIsDialogOpen(false)
    }, [games])

    const onSearch = () => {
        if (nameValue.length === 0) {
            setSuggestedGames([])
            return
        }

        for (let i = 0; i < allGames.length; i++) {
            if (allGames[i].name.toLowerCase().replace(/\s/g, '').includes(nameValue.toLowerCase().replace(/\s/g, ''))) {
                setSuggestedGames([allGames[i - 1], allGames[i], allGames[i + 1], allGames[i + 2], allGames[i + 3]])
            }
        }

        setShowGameSuggestion(true)
    }

    function handleNewGame() {
        let newGame: GameSaveType = {
            gameId: idValue,
            gameName: nameValue,
            path: gameSavesPath
        }

        setGames([...games, newGame])
    }

    function selectGameSavesLocation() {
        open({
            directory: true,
            multiple: false
        }).then((path) => {
            if (path) {
                setGameSavesPath(path)
                console.log(path)
            } else {
                return
            }
        })
    }

    return (
        <>
            <div className='min-w-screen min-h-screen flex flex-col'>
                <div className='text-white font-bold ml-8 mt-8 flex flex-col gap3'>
                    <h1 className='text-3xl'>Your Save Library</h1>

                    <div className={`mt-20 grid ${ convertNumberToCol(Math.floor(window.innerWidth / 230))} gap-5`}>
                        {
                            games.map((game) => {
                                return (
                                    <GameSave gameId={game.gameId} />
                                )
                            })
                        }

                        <Dialog open={isDialogOpen}>
                            <DialogTrigger >
                                <NewGame clickHandler={() => setIsDialogOpen(true)} />
                            </DialogTrigger>
                            <DialogContent className='dark'>
                                <DialogHeader>
                                    <DialogTitle className='text-white'>Add New Game</DialogTitle>
                                    <DialogDescription>Choose a game to add to your library</DialogDescription>
                                </DialogHeader>

                                <div className='relative flex flex-col gap-4'>
                                    <div className='flex gap-4'>
                                        <Input className='text-white' value={nameValue} placeholder='Enter game name' onChange={(e) => {
                                            setNameValue(e.target.value);
                                                setShowGameSuggestion(false)
                                            }} />
                                        <Button onClick={onSearch}>Search Game</Button>
                                    </div>
                                        
                                    <div className={`flex scroll mt-8 flex-col ${showGameSuggestion? 'absolute': 'hidden'} w-full`}>
                                        {suggestedGames.map((game) => {
                                            return (
                                                <button className={`bg-gray-800 w-full hover:bg-gray-600 duration-150 text-white px-3 py-1`} onClick={() => {
                                                    setIdValue(game.appid);
                                                    setNameValue(game.name);
                                                    setShowGameSuggestion(false);
                                                    setSuggestedGames([]);
                                                }}>{game.name}</button>
                                            )
                                        })}
                                    </div>

                                    <Button onClick={selectGameSavesLocation}>Select Saves Location</Button>
                                    {idValue && <Button onClick={handleNewGame}>Add Game</Button>}
                                </div>
                            </DialogContent>
                        </Dialog>

                    </div>
                </div>
            </div>
        </>
    )
}