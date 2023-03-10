import React, { createContext, useContext, useState} from "react";

const StateContext = createContext(undefined);


export const ChatContextProvider = ({ children}) => {

    const [messages, setMessages] = useState([]);
    const [members, setMembers] = useState();
    const [poll, setPoll] = useState(null)
    const [openPoll, setOpenPoll] = useState(null)

    return (
        <StateContext.Provider value={{

            messages, setMessages,
            members, setMembers,
            poll, setPoll,
            openPoll, setOpenPoll
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useChatStateContext = () => useContext(StateContext)