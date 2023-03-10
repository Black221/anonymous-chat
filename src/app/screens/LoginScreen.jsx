import {useEffect, useState} from "react";
import {useAuthStateContext} from "../context/AuthContextProvider";
import {useNavigate} from "react-router-dom";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../utils/firebase";


export const LoginScreen = () => {

    const [name, setName] = useState("");
    const [message, setMessage] = useState();

    const navigate = useNavigate();

    const auth = useAuthStateContext();

    const newMember = async (member) => {

        try {
            const docRef = await addDoc(collection(db, "Members"), member);

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    useEffect(() => {
        if (!auth.user)
            if (window.localStorage.getItem("user") && window.localStorage.getItem('token')) {
                auth.login({
                    login: window.localStorage.getItem('user'),
                    token: window.localStorage.getItem('token')
                })
                return navigate('/', {replace: true})
            }
    })

    return (
        <div className="flex h-screen max-h-screen items-center justify-between bg-gray-100">

            <div className="shadow drop-shadow max-w-[360px] max-h-[480px] mx-auto text-center p-4 rounded-2xl">

                <div className="text-xl">
                    {/*
                    <div className="text-2xl">Bienvenue</div>
                    <div>sur</div>
                    <div className="">Anonymous Chat</div>
                    */}
                    Salam salam
                </div>
                <div className="text-justify mt-4">
                    {/*
                    Ceci est une application en fase de test.
                    L'idée est de discuter sur un sujet en toute anonyma donc
                    soit libre et expressif mais n'oublions pas le respect.
                    */}
                    la classe comment vous allez.
                    Gnew len gnu wakhtane gnu cas en tout anonyma MDR
                    le principe c'est simple mettez un nom que personne
                    ne poura deviner et discutons svp nagnu respectewanté.
                </div>
                <div>
                    <div className="bg-red-400 my-2">
                        {message}
                    </div>
                    <div className="relative">

                        <input type="text" id="search"
                               className="block rounded-t-lg pl-2 px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-transparent focus:bg-transparent  border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" "
                               value={name}
                               onChange={(event) => {setName(event.target.value)}}
                        />

                        <label htmlFor="search"
                               className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                            Mettez un nom anonyme
                        </label>
                    </div>
                    <div>
                        <button className="p-2 px-8 mt-4 text-xl font-semibold shadow  rounded-2xl"
                                onClick={() => {
                                    if (name != null && name !== "")
                                        newMember({login: name, admin: false}).then(r => {
                                            auth.login({login: name, admin: false, token: "passer"})
                                            navigate('/', {replace: true})
                                        });
                                    else
                                        setMessage("Mettez un nom valide");
                                }}>
                            Entrer</button>
                    </div>
                </div>
            </div>
        </div>
    )
}