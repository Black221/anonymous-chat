import {SidebarHeadComponent} from "./SidebarHeadComponent";
import {ChatroomComponent} from "./ChatroomComponent";
import {useAppStateContext} from "../context/AppContextProvider";


export const SidebarComponent = () => {

    const {members} = useAppStateContext();


    return (
        <div className="flex flex-col h-full">

            <SidebarHeadComponent />

            <div className="flex-1 overflow-y-auto overflow-x-hidden pt-1">

                {members && members.map(({login, id, color}, index) => {
                    return (
                        <ChatroomComponent key={index} name={login} color={color} />
                    )
                })}
            </div>
        </div>
    )
}