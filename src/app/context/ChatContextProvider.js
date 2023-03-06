import React, { createContext, useContext, useState} from "react";

const StateContext = createContext(undefined);


export const ChatContextProvider = ({ children}) => {

    const [messages, setMessages] = useState([]);
    const [members, setMembers] = useState();

    return (
        <StateContext.Provider value={{

            messages, setMessages,
            members, setMembers
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useChatStateContext = () => useContext(StateContext)