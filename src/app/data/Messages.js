import { collection, addDoc } from "firebase/firestore";
import {db} from "../utils/firebase";

export const getMessage = () => {

}

export const addMessage = async (message) => {

    try {
        const docRef = await addDoc(collection(db, "Messages"), message);

        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

