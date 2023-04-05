import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import SignUp from "./pages/SignUp";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <SignUp/>
            },
            {
                path: "courses",
                element: <Courses/>,
                children: [
                    {
                        path: ":id",
                        element: <Courses/>
                    }
                ]
            }
        ]
    },
    {
        path: "*",
        element: <NotFound/>
    }
])