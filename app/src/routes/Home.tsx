import { Button } from '../components/ui/button'

export default function Home() {
    return (
        <>
            <div className="min-w-screen min-h-screen flex flex-col justify-center items-center">
                <div className="w-1/3 h-full flex justify-center items-center flex-col gap-16">
                    <h1 className="text-3xl text-white font-bold">StarCrown</h1>
                    <Button>Log in with google</Button>
                </div>
            </div>         
        </>
    )
}
