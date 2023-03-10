import {useAuthStateContext} from "../context/AuthContextProvider";
import {FaUser} from "react-icons/fa";
import {useAppStateContext} from "../context/AppContextProvider";
import {useNavigate} from "react-router-dom";


export const HeaderComponent = () => {

    const {user, logout} = useAuthStateContext();

    const {
        members
    } = useAppStateContext();

    const isAdmin = () => {
        return members.filter(({login, admin}) => (login === user.login && admin))[0]
    }

    const navigate = useNavigate();

    return (
        <div className="h-20 grid grid-cols-5">

            <div className="flex items-center font-semibold text-gray-700">
                Anonymous-Chat
            </div>

            <div className="col-span-3">

            </div>

            <div className="col-span-1 space-x-4 flex items-center justify-end text-gray-700">
                {isAdmin() && <button className="mr-2" onClick={() => {
                    logout();
                    navigate("login");
                }}>
                    edit
                </button>}
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