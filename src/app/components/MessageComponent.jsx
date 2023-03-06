import {useAppStateContext} from "../context/AppContextProvider";
import {useAuthStateContext} from "../context/AuthContextProvider";
import moment from "moment";


export const MessageComponent = ({sender, color, message, date}) => {

    const {
        screenSize,
    } = useAppStateContext();

    const {user} = useAuthStateContext();


    return (
        <div className={`mb-4 flex flex-col w-full ${user.login && user.login === sender ? "items-end rounded-tr-none" : "rounded-tl-none"}`}>
            <div className={`p-2 bg-gray-200  rounded-2xl w-fit ${user.login && user.login === sender ? "rounded-tr-none mr-2" : "rounded-tl-none  ml-2"} ${screenSize > 780 ? "max-w-1/2" : "max-w-3/4"}`}>
                <div className={`${color} font-semibold`}>
                    {sender}
                </div>
                <div>
                    {message}
                </div>
            </div>
            <div className="text-sm mx-2">
                {moment(date).format("h:mm:ss")}
            </div>
        </div>
    )
}