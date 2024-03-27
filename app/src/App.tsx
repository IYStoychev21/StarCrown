import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./routes/Home"
import Protected from "./components/Protected"
import Library from "./routes/Library"
import LoginSuccessful from "./routes/LoginSuccessful"

function App() {
    const BrowserRouter = createBrowserRouter([
        { path: '/', element: <Home /> },
        { path: '/library', element: <Protected> <Library /> </Protected> },
        { path: '/login/success', element: <LoginSuccessful /> },
    ])

    return (
        <RouterProvider router={BrowserRouter}/>
    )
}

export default App
