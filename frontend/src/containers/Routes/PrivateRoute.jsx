import { Navigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext.js";

const PrivateRoute = ({ children }) => {
    const { isAuthed } = useAuthContext();
    const loginUrl = '/login';

    return isAuthed ? children : <Navigate to={loginUrl} />
};

export default PrivateRoute;