import {SidebarHeadComponent} from "./SidebarHeadComponent";
import {useState} from "react";
import {ChatroomComponent} from "./ChatroomComponent";


export const SidebarComponent = () => {

    const [chatRooms] = useState(["bouna", "bamba"]);

    return (
        <div className="flex flex-col h-full">

            <SidebarHeadComponent />

            <div className="flex-1 overflow-y-auto overflow-x-hidden pt-1">

                {chatRooms.map((name, index) => {
                    return (
                        <ChatroomComponent key={index} name={name} />
                    )
                })}
            </div>
        </div>
    )
}