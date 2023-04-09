import App from "./App";
import Home from "./pages/Home";
import {createBrowserRouter} from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import CoursesPage from "./pages/courses/CoursesPage";
import Profile from "./pages/profile/Profile";
import CourseInfo from "./pages/courses/course-info/CourseInfo";
import Admin from "./pages/admin/Admin";
import ChangePassword from "./pages/profile/change-password/ChangePassword";
import CreateCourse from "./pages/admin/courses/create-course/CreateCourse";

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
                path: "login",
                element: <LoginPage/>
            },
            {
                path: "register",
                element: <RegisterPage/>
            },
            {
                path: "courses",
                children: [
                    {
                        path: "",
                        element: <CoursesPage/>
                    },
                    {
                        path: ":id",
                        element: <CourseInfo/>
                    }
                ]
            }
            ,
            {
                path: "profiles/:user_id",
                children: [
                    {
                        path: "",
                        element: <Profile/>
                    },
                    {
                        path: "change-password",
                        element: <ChangePassword/>
                    }
                ]
            },
            {
                path: "admin",
                children: [
                    {
                        path: "",
                        element: <Admin/>
                    },
                    {
                        path: "courses",
                        children: [
                            {
                                path: "create",
                                element: <CreateCourse/>
                            }
                        ]
                    }
                ]
            }
        ]
    }
])