import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({isAllowed, redirectPath = '/', children}: any) => {
    console.log("isAllowed", isAllowed)
    if (!isAllowed) return <Navigate to={redirectPath} replace/>
    return children ? children : <Outlet/>;
}