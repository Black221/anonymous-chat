import {useEffect} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {useAppStateContext} from "./context/AppContextProvider";

import './styles/App.css';
import {HomeScreen} from "./screens/HomeScreen";
import {LoginScreen} from "./screens/LoginScreen";
import {RegisterScreen} from "./screens/RegisterScreen";
import {MainAppScreen} from "./screens/MainAppScreen";
import {RequiredAuth} from "./guards/RequiredAuth";


function App() {

    //Get context app state
    const {
        setScreenSize,
    } = useAppStateContext();

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
