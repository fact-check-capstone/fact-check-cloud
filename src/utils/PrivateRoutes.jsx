import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const PrivateRoutes = () => {
  let auth = { token: false };
  let token = localStorage.getItem("token");
  if (token) {
    auth.token = true;
  }

  return auth.token ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
