import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { RegisterResponseError } from "../types/types";
import { useAuth } from "../auth/Auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LoginLayout from "../layout/LoginLayout";

export default function Register(){
    const auth = useAuth()
    const goTo = useNavigate()

    if(auth.isAuthenticated)
        return <Navigate to="/" />

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmError, setConfirmError] = useState("")


    function handleUsernameChange(e) {
        setUsername(e.target.value.trim())
    
        if (username.length < 5) {
            setUsernameError("The username must have a minimum of 6 characters.")
        } else {
            setUsernameError("")
        }
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)

        if (confirmPassword && password !== confirmPassword) {
          setConfirmError("Passwords do not match.")
        } else {
          setConfirmError("")
        }
        if(password.length < 3) {
            setPasswordError("The password must have a minimum of 4 characters.")
        }else{
            setPasswordError("")
        }
    }
    
    function handleConfirmPasswordChange(e) {
        setConfirmPassword(e.target.value)

        if (password && e.target.value !== password) {
          setConfirmError("Passwords do not match.")
        } else {
          setConfirmError("")
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
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
                console.log("User registred successfully")

                setUsernameError("")
                setPasswordError("")
                setConfirmError("")

                goTo("/login")
            }else{
                const json = await response.json() as RegisterResponseError
                
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
                    <Form.Control type="text" placeholder="example" value={username} onChange={handleUsernameChange} />
                    <Form.Text className="text-danger">{usernameError}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>password</Form.Label>
                    <Form.Control type="password" placeholder="*******" value={password} onChange={handlePasswordChange}/>
                    <Form.Text className="text-danger">{passwordError}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="*******" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
                    <Form.Text className="text-danger">{confirmError}</Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" className="mb-1 btn bg-cus-primary w-100">
                    Register
                </Button>

                <div className="text-end">
                    <Link className="link-dark" to="/login">
                        Ya tengo una cuenta
                    </Link>
                </div>
            </Form>
        </LoginLayout>
    )
}