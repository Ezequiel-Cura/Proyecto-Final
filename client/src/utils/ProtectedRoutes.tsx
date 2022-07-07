import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({isAllowed, redirectPath, state, children}: any) => {
    if (!isAllowed) return <Navigate to={redirectPath} state={state} replace/>
    return children ? children : <Outlet/>;
}