import Navbar from "./components/layouts/navbar/Navbar";
import {Outlet} from "react-router-dom";
import React from "react";

function App() {
    return (
        <div>
            <Navbar/>
            <hr/>
            <Outlet/>
        </div>
    );
}

export default App;
