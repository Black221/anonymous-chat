import {useAuthStateContext} from "../context/AuthContextProvider";
import {Navigate, } from "react-router-dom";


export const RequiredAuth = ({children}) => {

    const auth = useAuthStateContext();

    if (!auth.user)
        /* if (window.localStorage.getItem('user'))
            auth.login({
                login: window.localStorage.getItem('user'),
                token: window.localStorage.getItem('token')
            })
        else */
        return <Navigate to="/login" />

    return children;
}