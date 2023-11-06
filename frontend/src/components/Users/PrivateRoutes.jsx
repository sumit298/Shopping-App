import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ Component }) => {
  const isAuthenticated = useSelector(state=> state.authentication?.userDetails !== null  );
    console.log(isAuthenticated)

  const useStatus = useSelector((state) => state.authentication);
    console.log(useStatus)

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
