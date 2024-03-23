import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./routes/Home"
import Protected from "./components/Protected"
import Library from "./routes/Library"

function App() {
    const BrowserRouter = createBrowserRouter([
        { path: '/', element: <Home /> },
        { path: '/library', element: <Protected><Library /></Protected> }
    ])

    return (
        <RouterProvider router={BrowserRouter}/>
    )
}

export default App
