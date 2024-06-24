import { useContext } from "react";
import AuthContext from "../context/auth/AuthContext.jsx";

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;