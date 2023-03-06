import {ChatScreen} from "./ChatScreen";
import {SidebarComponent} from "../components/SidebarComponent";
import {useAppStateContext} from "../context/AppContextProvider";
import {useEffect, useState} from "react";
import {HeaderComponent} from "../components/HeaderComponent";
import {ChatContextProvider} from "../context/ChatContextProvider";



export const MainAppScreen = () => {

    const {
        screenSize
    } = useAppStateContext();

    const [isOpen, setIsOpen] = useState(false);


    useEffect( () => {

        if (screenSize < 780)
            setIsOpen(false);
        else
            setIsOpen(true);
    }, [screenSize]);


    return (
        <div className="pt-0 md:p-4 p-1.5  h-screen max-h-screen">

            <HeaderComponent />

            <div className="flex bg-gray-100 h-[calc(100%-5rem)] rounded-2xl overflow-hidden">

                <div id="sidebar" className={screenSize > 780 || isOpen ? "w-96 p-4  h-full border-r-4 border-white": ""}>
                    {isOpen && <SidebarComponent />}
                </div>

                <div className="flex-1">
                    <ChatContextProvider>
                        <ChatScreen />
                    </ChatContextProvider>
                </div>
            </div>
        </div>
    )
}