import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import Second from "../Layout/Second";
import Appointment from "../Pages/Appoimtment/Appointment";
import AddDoctor from "../Pages/DashBoard/AddDoctor/AddDoctor";
import AllUsers from "../Pages/DashBoard/AllUsers/AllUsers";
import ManageDoctors from "../Pages/DashBoard/ManageDoctors/ManageDoctors";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import MyAppointment from "../Pages/MyAppointment/MyAppointment";
import SignUp from "../Pages/SignUp/SignUp";
import Payment from "../Payment/Payment";
import DisplayError from "../Shared/DisplayError";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/appointment",
        element: <Appointment></Appointment>,
      },
    ],
  },
  {
    path: "/",
    element: <Second></Second>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <DisplayError></DisplayError>,
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <MyAppointment></MyAppointment>,
      },
      {
        path: "/dashboard/users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addDoctor",
        element: (
          <AdminRoute>
            <AddDoctor></AddDoctor>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageDoctors",
        element: (
          <AdminRoute>
            <ManageDoctors></ManageDoctors>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(
            `https://doctors-portal-server-mocha-phi.vercel.app/bookings/${params.id}`
          ),
      },
    ],
  },
]);
