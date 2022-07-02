import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({logged, redirectPath = '/', children}: any) => {
    if (!logged) return <Navigate to={redirectPath} replace/>
    return children;
}