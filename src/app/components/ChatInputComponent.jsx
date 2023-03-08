import {BsArrowDownCircleFill} from "react-icons/bs";
import {FaTelegramPlane, FaPoll, FaFacebookMessenger} from "react-icons/fa";
import {useEffect, useState} from "react";

import {useAuthStateContext} from "../context/AuthContextProvider";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../utils/firebase";
import {useAppStateContext} from "../context/AppContextProvider";
import {PollComponents} from "./PollComponents";
import {TiDelete} from "react-icons/ti";
import {CreatePollComponent} from "./CreatePollComponent";

export const ChatInputComponent = ({goTop, reply, resetReply}) => {

    const {
        chatroom
    } = useAppStateContext();

    const {user} = useAuthStateContext();

    const [text, setText] = useState("");

    const [poll, setPoll] = useState(false);

    const [pollItem, setPollItem] = useState(null);

    const addMessage = async (message) => {

        try {
            await addDoc(collection(db, "Messages"), message);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const receivePoll = (poll) => {
        setPollItem(poll)
    }

    useEffect(() => {
        setPollItem(null)
    }, [poll])

    return (
        <div className="flex items-center space-x-4 px-4 w-full h-full text-gray-700">

            <button onClick={() => goTop()}>
                <BsArrowDownCircleFill size={20} />
            </button>

            <button onClick={() => { setPoll((prev) => (!prev))}}>
                {!poll ? <FaPoll size={20} /> : <TiDelete size={24} />}
            </button>


            <div className="flex-1 relative bottom-0">

                {poll && <div className="absolute bottom-12 flex py-4 justify-center   bg-gray-200 rounded-2xl" >
                    <CreatePollComponent sendPoll={receivePoll} />
                </div>}

                {chatroom && ((chatroom.admin && user.admin) || !chatroom.admin)
                    ? <input type="text"
                             className="flex-1 outline-none bg-transparent focus:border-none border-none"
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
                        poll: pollItem
                    }).then(() => {
                    });
                    goTop()
                    resetReply();
                    setPoll(false)
                    setText("");
                }
            }}>
                <FaTelegramPlane size={24} />
            </button>
        </div>
    )
}