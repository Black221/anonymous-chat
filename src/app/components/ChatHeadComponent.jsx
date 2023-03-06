import {BsThreeDotsVertical} from "react-icons/bs";
import {HiUserGroup} from "react-icons/hi";


export const ChatHeadComponent = () => {

    return (
        <div className="flex items-center px-4 h-full space-x-2 text-gray-700">

            <div className="w-12 h-12 bg-white rounded-full items-center justify-center flex">
                <HiUserGroup size={24} />
            </div>

            <div className="flex-1">
                <span className="font-semibold outline-none">DIC tronc commun</span>
            </div>

            <div className="">
                <BsThreeDotsVertical />
            </div>
        </div>
    )
}