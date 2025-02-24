import { createContext, useContext, useEffect, useState } from "react"

interface AuthProps {
    children: React.ReactNode
}

const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () => {},
    saveUser: (token, userdata) => {},
    checkAuth: () => {}
})

export function Auth({children}: AuthProps){
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [accessToken, setAccessToken] = useState<string>("")

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setAccessToken(token)
            setAuthenticated(true)
        }
    }, [])

    async function checkAuth(){

        if(accessToken){
            setAuthenticated(true)
        }
    }


    function getAccessToken() {
        return accessToken
    }

    function saveUser(token: string, userdata: {}){
        setAccessToken(token)

        localStorage.setItem("token", token)
        setAuthenticated(true)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, getAccessToken, saveUser, checkAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

// hook para el estado "authenticado" del usuario
export const useAuth = () => useContext(AuthContext)