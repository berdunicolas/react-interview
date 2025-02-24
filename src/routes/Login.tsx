import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { LoginResponseError } from "../types/types"
import { useAuth } from "../auth/Auth"
import { Link, Navigate, useNavigate } from "react-router-dom"
import LoginLayout from "../layout/LoginLayout"

export default function Login(){
    const auth = useAuth()
    const goTo = useNavigate()
    
    if(auth.isAuthenticated)
        return <Navigate to="/" />

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                })
            })

            if(response.ok){
                console.log("User logged successfully")

                const json = await response.json()

                setUsernameError("")
                setPasswordError("")

                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/userinfo`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${json.token}`
                        },
                    })
        
                    if(response.ok){
        
                        const userdata = await response.json()
        
                        auth.saveUser(json.token, userdata)
                        goTo("/")
                    }else{
                        //
                    }
        
                } catch (error) {
                    console.log(error)
                }
            }else{
                const json = await response.json() as LoginResponseError
                
                setUsernameError(json.username ? json.username : "")
                setPasswordError(json.password ? json.password : "")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <LoginLayout>
            <Form className="card p-3" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="example" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Form.Text className="text-danger">{usernameError}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Form.Text className="text-danger">{passwordError}</Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" className="mb-1 btn bg-cus-primary w-100">
                    Login
                </Button>

                <div className="text-end">
                    <Link className="link-dark" to="/register">
                        No tengo una cuenta
                    </Link>
                </div>
            </Form>
        </LoginLayout>
    )
}