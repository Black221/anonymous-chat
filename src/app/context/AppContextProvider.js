import React, { createContext, useContext, useState} from "react";

const StateContext = createContext(undefined);


export const AppContextProvider = ({ children}) => {
    const [screenSize, setScreenSize] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({login: "bouna"})
    const [theme, setTheme] = useState("light")
    return (
        <StateContext.Provider value={{
            screenSize, setScreenSize,
            isLoading, setIsLoading,
            userInfo, setUserInfo,
            theme, setTheme
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useAppStateContext = () => useContext(StateContext)