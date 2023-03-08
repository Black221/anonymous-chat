import {useEffect, useRef, useState} from "react";
import {GrAdd} from "react-icons/gr";


export const CreatePollComponent = ({sendPoll}) => {

    const [pollName, setPollName] = useState("");
    const [numberOfInput, setNumberOfInput] = useState([1,2]);

    let ref = useRef()

    const onSubmit = () => {
        let poll = [];
        if (ref.current.children)
            for (let i = 0; i  < numberOfInput.length; i ++)
                    poll.push({title: ref.current.children[i].children[0].value, votes: []})
        sendPoll({name: pollName, choice: [...poll]});
    }

    useEffect(() => {
        onSubmit();
    }, [])

    return (
        <div className="space-y-2 text-center w-80">
            <div>Ajouter vote</div>
            <input className="w-72 pl-2 rounded bg-gray-50" type="text" value={pollName} onChange={(e) => setPollName(e.target.value)} placeholder="Vote pour..."/>
            <div ref={ref} className="space-y-2 text-sm" >
                {numberOfInput.map((item, index) => (
                        <div key={index}>
                            <input placeholder={`choix ${index + 1}`} type="text" className="w-72 pl-2 rounded bg-gray-50" />
                        </div>
                    )
                )}
            </div>
            <div className="flex justify-between px-4">
                <button onClick={() => {
                    setNumberOfInput((prev) => ([...prev, prev.length + 1]))
                }}>
                    <GrAdd />
                </button>
                <button className="px-4 py-1 bg-gray-50 rounded-xl font-bold" onClick={onSubmit}>valider</button>
            </div>
        </div>
    )
}