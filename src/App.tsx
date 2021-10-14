import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import {HashRouter} from "react-router-dom";
import Routes from "./components/routes/Routes";

function App() {
    return (
        //hr, provider

        <HashRouter>
            <div className="App">
                <Header/>
                <Routes/>
            </div>
        </HashRouter>
    );
}

export default App;
