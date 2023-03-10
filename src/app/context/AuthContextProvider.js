
import React, {createContext, useContext, useState} from "react";

const StateContext = createContext(undefined);


export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const login = (user) => {
        setUser({...user, admin: false});
        window.localStorage.setItem("user", user.login);
        window.localStorage.setItem("token", user.token);
    }

    const logout = () => {
        setUser(null);
        window.localStorage.clear();
    }


    return (
        <StateContext.Provider value={{
            user, login, logout
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useAuthStateContext = () => useContext(StateContext)