

export default function NewGame({ clickHandler }: { clickHandler: () => void }){
    return (
        <>
            <div onClick={clickHandler} className="w-[230px] h-[107px] flex justify-center items-center bg-slate-700 rounded-sm hover:bg-slate-600 cursor-pointer">
                <h1>Add New Game</h1>
            </div>
        </>
    )
}