import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import SignUp from "./pages/SignUp";
import AddCourse from "./pages/courses/AddCourse";
import Profile from "./pages/Profile";
import Course from "./pages/courses/Course";
import AdminCourses from "./pages/admin/AdminCourses";
import AssignCourseToInstructor from "./pages/admin/AssignCourseToInstructor";
import InstructorHome from "./pages/instrutors/InstructorHome";
import InstructorCourses from "./pages/instrutors/InstructorCourses";


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
                path: "/courses",
                children: [
                    {
                        path: "",
                        element: <Courses/>
                    },
                    {
                        path: ":id",
                        element: <Course/>
                    },
                ]
            },
            {
                path: "/profiles/:id",
                element: <Profile/>
            },
            {
                path: "/admin",
                children: [
                    {
                        path: "courses",
                        children: [
                            {
                                path: "",
                                element: <AdminCourses/>
                            }, {
                                path: ":create",
                                element: <AddCourse/>
                            }, {
                                path: ":id/assign",
                                element: <AssignCourseToInstructor/>
                            }
                        ]
                    }
                ]
            },
            {
                path: "/instructors",
                children: [
                    {
                        path: ":id",
                        children: [
                            {
                                path: "",
                                element: <InstructorHome/>
                            },
                            {
                                path: "courses/:course_id",
                                element: <InstructorCourses/>
                            }
                        ]
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