import {SidebarHeadComponent} from "./SidebarHeadComponent";
import {useEffect, useState} from "react";
import {ChatroomComponent} from "./ChatroomComponent";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../utils/firebase";
import {useAppStateContext} from "../context/AppContextProvider";


export const SidebarComponent = () => {

    const {members, setMembers} = useAppStateContext();

    const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

    const fetchPost = async () => {

        await onSnapshot(collection(db, "Members"), (snapshot) => {
            let mes = []; let i = 0;
            snapshot.docs.forEach((doc) => {
                mes.push({...doc.data(), id: doc.id, color: colorArray[i++]});
                if (i > colorArray.length)
                    i = 0;
            })
            setMembers(mes);
        })


    }

    useEffect(()=>{
        fetchPost().then(r => {});
    }, [])

    return (
        <div className="flex flex-col h-full">

            <SidebarHeadComponent />

            <div className="flex-1 overflow-y-auto overflow-x-hidden pt-1">

                {members && members.map(({login, id, color}, index) => {
                    return (
                        <ChatroomComponent key={index} name={login} color={color} />
                    )
                })}
            </div>
        </div>
    )
}