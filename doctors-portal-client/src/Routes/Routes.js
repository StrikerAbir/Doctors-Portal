import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Second from "../Layout/Second";
import Appointment from "../Pages/Appoimtment/Appointment";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: '/appointment',
                element: <Appointment></Appointment>
            }
        ]
    },
    {
        path: "/",
        element: <Second></Second>,
        children: [
            { 
                path: "/login",
                element:<Login></Login>
            }
        ]
    }
])