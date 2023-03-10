import {useAppStateContext} from "../context/AppContextProvider";
import {useAuthStateContext} from "../context/AuthContextProvider";
import moment from "moment";
import {BsReply} from "react-icons/bs";
import {ReplyComponent} from "./ReplyComponent";
import {useEffect, useState} from "react";
import {PollComponents} from "./PollComponents";


export const MessageComponent = ({sender, message, date, reply, poll, sendReply, id}) => {

    const {
        screenSize,
        members,
    } = useAppStateContext();

    const {user} = useAuthStateContext();

    const [color, setColor] = useState("#d12b2b");

    useEffect(() => {
        if (members.filter((member) => ( member.login === sender))[0])
        setColor(
            members.filter((member) => ( member.login === sender))[0].color
        );
    }, [members])


    return (
        <div className={` mb-4 flex flex-col  ${user.login && user.login === sender ? "items-end rounded-tr-none" : "rounded-tl-none"}`}>

            <div className={`relative p-2 bg-gray-200  rounded-2xl w-fit ${user.login && user.login === sender ? "rounded-tr-none mr-2" : "rounded-tl-none  ml-2"} ${screenSize > 780 ? "max-w-1/2" : "max-w-3/4"}`}>

                {reply && user.login === reply.sender && <div className={`absolute text-sm ${user.login && user.login !== sender ? "-right-12" : "-left-20"}`}>for me</div>}
                {reply && <ReplyComponent reply={reply} sender={sender} />}
                {poll && <PollComponents name={poll.name} choice={poll.choice} mesId={id} />}

                <div className={` font-semibold flex items-center text-sm`} style={{color: color}}>
                    {sender}
                    <button className={`ml-2 flex text-[10px]`} onClick={() => sendReply({sender, message})}>
                        <BsReply size={20}/> reply
                    </button>
                </div>

                <div className="ml-1 text-sm">
                    {message}
                </div>
            </div>

            <div className="text-sm mx-2">
                {moment(date).format("h:mm:ss")}
            </div>
        </div>
    )
}