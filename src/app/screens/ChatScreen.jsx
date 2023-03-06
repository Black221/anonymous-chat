import {ChatHeadComponent} from "../components/ChatHeadComponent";
import {ChatInputComponent} from "../components/ChatInputComponent";
import {useChatStateContext} from "../context/ChatContextProvider";
import {MessageComponent} from "../components/MessageComponent";
import {useEffect, useRef} from "react";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../utils/firebase";


export const ChatScreen = () => {

    const {
        messages, setMessages,
        members,
        name
    } = useChatStateContext ();

    function useChatScroll(dep) {
        const ref = useRef();
        useEffect(() => {
            if (ref.current) {
                ref.current.scrollTop = ref.current.scrollHeight;
            }
        }, [dep]);
        return ref;
    }

    const fetchPost = async () => {

        await onSnapshot(collection(db, "Messages"), (snapshot) => {
            let mes = []
            snapshot.docs.forEach((doc) => {
                mes.push({...doc.data(), id: doc.id});
            })
            mes.sort((a, b) => {
                return a.date < b.date ? -1 : 1;
            })
            setMessages(mes);
        })


    }

    useEffect(()=>{
        fetchPost().then(r => {});
    }, [])

    const ref = useChatScroll(messages)

    return (
        <div className="flex flex-col h-full w-full">

            <div className="h-16 border-b-2 border-white w-full">
                <ChatHeadComponent name={name} members={members} />
            </div>

            <div ref={ref} className="flex-1  border-b-2 p-1 border-white overflow-y-auto scroll-smooth">

                {messages.map(({sender, message, color, date}, index) => {

                    return (
                        <MessageComponent key={index} sender={sender} color={color} message={message} date={date} />
                    );
                })}
            </div>

            <div className="h-16 p-2">
                <ChatInputComponent />
            </div>
        </div>
    )
}