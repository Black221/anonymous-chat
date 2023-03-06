import {useAuthStateContext} from "../context/AuthContextProvider";
import {FaUser} from "react-icons/fa";


export const HeaderComponent = () => {

    const {user} = useAuthStateContext();

    return (
        <div className="h-20 grid grid-cols-5">

            <div className="flex items-center font-semibold text-gray-700">
                Anonymous-Chat
            </div>

            <div className="col-span-3">

            </div>

            <div className="col-span-1 space-x-4 flex items-center justify-end text-gray-700">

                <div className="flex items-center space-x-4">
                    <span>{user.login}</span>
                    <div className="hover:shadow hover:cursor-pointer rounded-full w-16 h-16 bg-gray-100 flex items-center justify-center">
                        <FaUser size={30} />
                    </div>
                </div>
            </div>
        </div>
    )
}