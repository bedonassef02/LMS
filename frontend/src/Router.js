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
import NotFound from "./pages/not-found/NotFound";
import CreateInstructor from "./pages/admin/instructors/CreateInstructor";
import AdminCourses from "./pages/admin/courses/AdminCourses";
import AdminInstructors from "./pages/admin/courses/AdminInstructors";
import InstructorPage from "./pages/instructors/InstructorPage";
import StudentsList from "./pages/instructors/students/StudentsList";
import CourseList from "./pages/profile/student-courses/CourseList";
import EditCourse from "./pages/admin/courses/edit-course/EditCourse";

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
            },
            {
                path: "instructors/:id",
                children: [
                    {
                        path: "",
                        element: <InstructorPage/>
                    },
                    {
                        path: "courses/:course_id/students",
                        element: <StudentsList/>
                    },
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
                    },
                    {
                        path: "courses",
                        element: <CourseList/>
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
                                path: "",
                                element: <AdminCourses/>
                            },
                            {
                                path: "create",
                                element: <CreateCourse/>
                            },
                            {
                                path: ":course_id/edit",
                                element: <EditCourse/>
                            }
                        ]
                    },
                    {
                        path: "instructors",
                        children: [
                            {
                                path: "",
                                element: <AdminInstructors/>
                            },
                            {
                                path: "create",
                                element: <CreateInstructor/>
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