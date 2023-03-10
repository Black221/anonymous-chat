import {BsArrowDownCircleFill} from "react-icons/bs";
import {FaTelegramPlane, FaPoll} from "react-icons/fa";
import {useState} from "react";

import {useAuthStateContext} from "../context/AuthContextProvider";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../utils/firebase";
import {useAppStateContext} from "../context/AppContextProvider";
import {TiDelete} from "react-icons/ti";
import {useChatStateContext} from "../context/ChatContextProvider";


export const ChatInputComponent = ({goTop, reply, resetReply}) => {

    const {
        chatroom
    } = useAppStateContext();

    const {user} = useAuthStateContext();

    const [text, setText] = useState("");

    const {
        poll, setPoll,
        openPoll, setOpenPoll
    } = useChatStateContext();

    const addMessage = async (message) => {

        try {
            await addDoc(collection(db, "Messages"), message);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    return (
        <div className="flex items-center space-x-4 px-4 w-full h-full text-gray-700">

            <button onClick={() => goTop()}>
                <BsArrowDownCircleFill size={20} />
            </button>

            {user.admin && <button onClick={() => {
                setOpenPoll((prev) => (!prev))
            }}>
                {!openPoll ? <FaPoll size={20}/> : <TiDelete size={24}/>}
            </button>}

            <div className="flex-1 relative bottom-0">

                {chatroom && ((chatroom.admin && user.admin) || !chatroom.admin)
                    ? <input type="text"
                             className="w-full outline-none bg-transparent focus:border-none border-none"
                             placeholder="Type something"
                             value={text}
                             onChange={(event) => {
                                 setText(event.target.value);
                             }}/>
                    : <div className="flex-1 text-center flex justify-center items-center">
                        Seul les admins peuvent parler
                    </div>
                }
            </div>

            <button onClick={() => {
                if (text != null && text !== "") {
                    addMessage({
                        sender: user.login,
                        message: text,
                        date: Date.now(),
                        reply: reply,
                        poll: openPoll ? poll : null
                    }).then(() => {
                    });
                    goTop()
                    resetReply();
                    setOpenPoll(false)
                    setPoll(null)
                    setText("");
                }
            }}>
                <FaTelegramPlane size={24} />
            </button>
        </div>
    )
}