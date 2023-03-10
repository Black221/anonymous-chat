import {useAuthStateContext} from "../context/AuthContextProvider";
import {updateDoc, doc} from "firebase/firestore";
import {db} from "../utils/firebase";


export const PollComponents = ({name, choice, mesId }) => {

    const {user} = useAuthStateContext();
    const addVote = async (index, status) => {

        let poll = {name, choice}
        console.log(status)
        if (status) {
            if (!poll.choice[index].votes.filter((item) => (item === user.login))[0])
                poll.choice[index].votes.push(user.login);
        } else
            poll.choice[index].votes = poll.choice[index].votes.filter((item) => (item !== user.login));

        try {
            await updateDoc(doc(db, "Messages", mesId), {poll : poll});
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div className="space-y-2 text-center w-80 bg-white rounded-2xl w-full">
            <div>{name}</div>
            <div className="space-y-2 text-sm text-start p-2" >
                {choice && choice.map((item, index) => (
                        <div key={index} className="flex justify-between">
                            <input  onClick={(e) => {
                                addVote(index, e.target.checked);

                            }} type="checkbox" className="mr-2"/>
                            <span className="flex-1">{item.title}</span>
                            <span className=" ml-2">{item.votes[0] ? item.votes.length : 0}</span>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}