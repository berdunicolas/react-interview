import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ReactDOM from 'react-dom/client'
import React from "react"
import { Auth } from "./auth/Auth"
import Login from "./routes/Login"
import Logout from "./routes/Logout"
import Register from "./routes/Register"
import ProxyRoute from "./routes/ProxyRoute"
import Home from "./routes/Home"
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/app.css'

const router = createBrowserRouter([
    { path: "/login", element: <Login />},
    { path: "/loguot", element: <Logout />},
    { path: "/register", element: <Register />},
    { path: "/", element: <ProxyRoute />, children: [
            {path: "/", element: <Home />}
        ]
    }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Auth>
            <RouterProvider router={router} />
        </Auth>
    </React.StrictMode>
)