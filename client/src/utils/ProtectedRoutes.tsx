import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({isAllowed, children}: any) => {
    if (isAllowed.reason) {
        if (isAllowed.reason === "unVerified") {
            return <Navigate to={"/unVerified"} replace/>
        }
        if (isAllowed.reason === "banned") {
            return <Navigate to={"/banned"} replace/>
        }
    }
    if (!isAllowed.boolean) {
        return <Navigate to="/login" state={{registered: true}} replace/>
    }
    return children ? children : <Outlet/>;
}