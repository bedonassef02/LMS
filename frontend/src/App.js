import Header from "./components/Header";
import {Outlet} from "react-router-dom";

function App() {

    return (
        <div className="App">
            <Header isLogin={false}/>
            <Outlet />
        </div>
    );
}

export default App;
