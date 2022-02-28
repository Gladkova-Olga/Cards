import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import {HashRouter} from "react-router-dom";
import Routes from "./components/routes/Routes";
import {Provider} from "react-redux";
import store from "./bll/store";
import Preloader from "./components/common/preloader/Preloader";
import Error from "./components/common/error/Error";

function App() {
    return (
        //hr, provider
        <Provider store={store}>
            <HashRouter>
                <div className="App">
                    <Header/>
                    <Preloader/>
                    <Routes/>
                    <Error/>
                </div>
            </HashRouter>
        </Provider>
    );
}

export default App;
