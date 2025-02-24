import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/Auth";

export default function ProxyRoute() {
    const auth = useAuth()

    auth.checkAuth()

    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}