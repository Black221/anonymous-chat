import {ChatHeadComponent} from "../components/ChatHeadComponent";
import {ChatInputComponent} from "../components/ChatInputComponent";
import {useChatStateContext} from "../context/ChatContextProvider";
import {MessageComponent} from "../components/MessageComponent";
import {useEffect, useRef, useState} from "react";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../utils/firebase";
import {useAppStateContext} from "../context/AppContextProvider";
import {ReplyComponent} from "../components/ReplyComponent";
import {TiDelete} from "react-icons/ti";
import {CreatePollComponent} from "../components/CreatePollComponent";


export const ChatScreen = () => {

    const {
        messages, setMessages,
        name,
        openPoll,
    } = useChatStateContext ();


    const [countNewMes, setCountNewMes] = useState(0);
    const [reply, setReply] = useState(null);


    const resetReply = () => setReply(null);
    const sendReply = (reply) => setReply(reply);


    const {
        members,
        chatroom
    } = useAppStateContext();

    const refS = useRef();

    function useChatScroll(dep) {
        const ref = useRef();
        useEffect(() => {
            setCountNewMes((prevState) => {
                console.log(prevState++)
                return prevState ++;
            });
            console.log(countNewMes);
        }, [dep]);

        return ref;
    }

    useEffect(() => {
        console.log(chatroom)
    }, [chatroom])

    useEffect(() => {

        const handleResize = () => {
           if (refS.current)
               if (refS.current.scrollTop === refS.current.scrollHeight)
                   setCountNewMes(0);
            console.log(refS.current)

        }
        if (refS.current) {

            window.addEventListener('scroll', handleResize);

            handleResize();
            // eslint-disable-next-line react-hooks/exhaustive-deps
            return () => window.removeEventListener('scroll', handleResize);
        }
    } )

    const goTop = () => {
        if (refS.current)
            refS.current.scrollTop = refS.current.scrollHeight;
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

            <div ref={refS} className="flex-1 w-full border-b-2 p-1 border-white overflow-y-auto scroll-smooth">

                {messages.map(({sender, message, color, date, reply, poll, id}, index) => {

                    return (
                        <MessageComponent key={index} sender={sender} color={color} message={message} date={date} reply={reply} poll={poll} id={id} sendReply={sendReply}  />
                    );
                })}
            </div>

            {reply && <div className={`p-1 border-b-2 border-white bg-gray-200 `}>

                <div className="flex justify-between text-gray-800 text-sm">

                    <span>Répondre à</span>
                    <button onClick={() => resetReply()}>
                        <TiDelete size={18}/>
                    </button>
                </div>

                <ReplyComponent reply={reply}  />
            </div>}

            {openPoll && <div className=" bottom-12 flex py-4 justify-center   bg-gray-200 " >
                <CreatePollComponent  />
            </div>}

            <div ref={ref} className="h-16 p-2">
                <ChatInputComponent goTop={goTop} reply={reply} resetReply={resetReply} />
            </div>
        </div>
    )
}