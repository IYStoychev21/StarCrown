import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./routes/Home"
import Protected from "./components/Protected"
import FinalizeAccount from "./routes/FinalizeAccount"

function App() {
    const BrowserRouter = createBrowserRouter([
        { path: '/', element: <Home /> },
        { path: '/finalize', element: <Protected><FinalizeAccount /></Protected> }
    ])

    return (
        <RouterProvider router={BrowserRouter}/>
    )
}

export default App
