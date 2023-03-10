import {useEffect, useRef, useState} from "react";
import {GrAdd} from "react-icons/gr";
import {useChatStateContext} from "../context/ChatContextProvider";


export const CreatePollComponent = ({sendPoll}) => {

    const [pollName, setPollName] = useState("");
    const [numberOfInput, setNumberOfInput] = useState([1,2]);

    const {
        setPoll,
        openPoll
    } = useChatStateContext();

    let ref = useRef()

    const onSubmit = () => {
        let poll = [];
        if (ref.current.children)
            for (let i = 0; i  < numberOfInput.length; i ++)
                    poll.push({title: ref.current.children[i].children[0].value, votes: []})
        setPoll({name: pollName, choice: [...poll]});
    }


    return (
        <div className="space-y-2 text-center w-full px-8">
            <div>Ajouter vote</div>
            <input className="w-full pl-2 rounded bg-gray-50" type="text" value={pollName} onChange={(e) => setPollName(e.target.value)} placeholder="Vote pour..."/>
            <div ref={ref} className="space-y-2 text-sm w" >
                {numberOfInput.map((item, index) => (
                        <div key={index}>
                            <input placeholder={`choix ${index + 1}`} type="text" className="w-full pl-2 rounded bg-gray-50" onChange={() => onSubmit()} />
                        </div>
                    )
                )}
            </div>
            <div className="flex justify-center px-4">
                <button onClick={() => {
                    setNumberOfInput((prev) => ([...prev, prev.length + 1]))
                }}>
                    <GrAdd />
                </button>
            </div>
        </div>
    )
}