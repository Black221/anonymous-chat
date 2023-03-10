import {useEffect} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {useAppStateContext} from "./context/AppContextProvider";

import './styles/App.css';
import {HomeScreen} from "./screens/HomeScreen";
import {LoginScreen} from "./screens/LoginScreen";
import {RegisterScreen} from "./screens/RegisterScreen";
import {MainAppScreen} from "./screens/MainAppScreen";
import {RequiredAuth} from "./guards/RequiredAuth";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "./utils/firebase";


function App() {

    //Get context app state
    const {
        setScreenSize,
        setChatroom
    } = useAppStateContext();

    const {setMembers} = useAppStateContext();

    const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#92922f', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

    const fetchChatroom = async () => {

        await onSnapshot(collection(db, "Chatrooms"), (snapshot) => {
            let mes = []; let i = 0;
            snapshot.docs.forEach((doc) => {
                mes.push({...doc.data(), id: doc.id, color: colorArray[i++]});
                if (i > colorArray.length)
                    i = 0;
            })
            setChatroom(mes[0]);
        })
    }

    useEffect(()=>{
        fetchChatroom().then(r => {});
    }, [])

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
    //Get and set screen size to adapt the app for all device
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth ? window.innerWidth : 0);
        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, );


    /*
    * RENDER a router :
    *   -Presentation screen
    *   -Login screen
    *   -Register screen
    *   -Home screen
    */

    return (
        <div className="App">
            <BrowserRouter>
                <div id="option-site">

                </div>
                <div>
                    <Routes>

                        <Route path={"/explore"} exact element={
                            <HomeScreen />
                        } />

                        <Route path={"/"} exact element={
                            <RequiredAuth>
                                <MainAppScreen />
                            </RequiredAuth>
                        } />

                        <Route path={"/login"} exact element={
                            <LoginScreen />
                        } />

                        <Route path={"/register"} exact element={
                            <RegisterScreen />
                        } />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
