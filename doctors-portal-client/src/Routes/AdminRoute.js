import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAdmin from "../Hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const location = useLocation();
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user.email);

  if (loading || isAdminLoading) {
    return <progress className="progress w-full"></progress>;
  }
  if (user && isAdmin) {
      return children;
}
return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
