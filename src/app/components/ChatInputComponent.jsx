import {BsArrowDownCircleFill} from "react-icons/bs";
import {FaTelegramPlane} from "react-icons/fa";
import {useState} from "react";

import {useAuthStateContext} from "../context/AuthContextProvider";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../utils/firebase";

export const ChatInputComponent = ({goTop}) => {

    const addMessage = async (message) => {

        try {
            await addDoc(collection(db, "Messages"), message);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const {user} = useAuthStateContext();

    const [text, setText] = useState("");

    return (
        <div className="flex items-center space-x-4 px-4 w-full h-full text-gray-700">

            <button onClick={() => goTop()}>
                <BsArrowDownCircleFill size={20} />
            </button>

            <input type="text"
                   className="flex-1 outline-none bg-transparent focus:border-none border-none"
                   placeholder="Type something"
                   value={text}
                   onChange={(event) => {

                       setText(event.target.value);
                   }}/>

            <button onClick={() => {
                if (text != null && text !== "") {
                    addMessage({
                        sender: user.login,
                        color: "text-red-600",
                        message: text,
                        date: Date.now()
                    }).then(() => {

                    });
                    setText("");
                }
            }}>
                <FaTelegramPlane size={24} />
            </button>
        </div>
    )
}