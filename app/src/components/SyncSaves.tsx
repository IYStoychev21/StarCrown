import { Button } from "./ui/button"

export default function SyncSaves({syncFrom, syncTo}: {syncFrom: () => void, syncTo: () => void}) {
    return (
        <>
            <div className="w-full h-10 relative bg-green-600 top-0 left-0 text-white flex items-center">
                <div className="flex items-center absolute right-4 gap-2">
                   <Button onClick={syncFrom} size="sm" variant="outline" className="dark bg-green-600 hover:bg-green-700 border-white border-2">Sync from cloud</Button> 
                   <Button onClick={syncTo} size="sm" variant="outline" className="dark bg-green-600 hover:bg-green-700 border-white border-2">Sync to cloud</Button> 
                </div>
            </div>
        </>
    )
}