import {useAuthStateContext} from "../context/AuthContextProvider";
import {useEffect, useState} from "react";
import {useAppStateContext} from "../context/AppContextProvider";


export const ReplyComponent = ({reply, sender}) => {

    const {
        members
    } = useAppStateContext();

    const {user} = useAuthStateContext();

    const [color, setColor] = useState("#d12b2b");

    useEffect(() => {
        if (members.filter((member) => ( member.login === reply.sender))[0])
            setColor(
                members.filter((member) => ( member.login === reply.sender))[0].color
            );
    }, [members])

    return (
        <div className={`text-sm p-2 bg-gray-100 max-h-36 mb-1 ${user.login === sender ? "rounded-tl-xl" : "rounded-tr-xl"} `}>
            <div className={`font-semibold`} style={{color: color}}>{reply.sender}</div>
            <p className={`truncate ml-1`}>{reply.message}</p>
        </div>
    )
}