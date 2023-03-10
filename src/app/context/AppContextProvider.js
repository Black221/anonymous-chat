import React, { createContext, useContext, useState} from "react";

const StateContext = createContext(undefined);


export const AppContextProvider = ({ children}) => {
    const [screenSize, setScreenSize] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [members, setMembers] = useState([])
    const [chatroom, setChatroom] = useState(null)
    const [theme, setTheme] = useState("light")
    return (
        <StateContext.Provider value={{
            screenSize, setScreenSize,
            isLoading, setIsLoading,
            chatroom, setChatroom,
            members, setMembers,
            theme, setTheme,


        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useAppStateContext = () => useContext(StateContext)