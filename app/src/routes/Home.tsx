import { useEffect } from 'react'
import { Button } from '../components/ui/button'
import { createDir, BaseDirectory, writeTextFile, exists } from '@tauri-apps/api/fs';

export default function Home() {
    const handleLogin = () => {
        window.location.href = import.meta.env.VITE_BACKEND_URL + '/login'
    }

    const createConfigDirectory = async () => {
        try {
            await createDir('StarCrown', { dir: BaseDirectory.Document, recursive: true });

            if (await exists('StarCrown/library.json', { dir: BaseDirectory.Document }) === false)
            {
                await writeTextFile('StarCrown/library.json', JSON.stringify([]), { dir: BaseDirectory.Document });
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        createConfigDirectory();
    }, [])

    return (
        <>
            <div className="min-w-screen min-h-screen flex flex-col justify-center items-center">
                <div className="w-1/3 h-full flex justify-center items-center flex-col gap-16">
                    <h1 className="text-3xl text-white font-bold">StarCrown</h1>
                    <Button onClick={handleLogin}>Log in with google</Button>
                </div>
            </div>         
        </>
    )
}
