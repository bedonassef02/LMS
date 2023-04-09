import Navbar from "./components/layouts/navbar/Navbar";
import {Outlet} from "react-router-dom";

function App() {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    );
}

export default App;
