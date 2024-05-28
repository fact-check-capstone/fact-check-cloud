import { Outlet, Navigate } from "react-router-dom";

const AuthRoutesCheck = () => {
  let auth = { token: false };
  let token = localStorage.getItem("token");
  if (token) {
    auth.token = true;
  }

  return auth.token ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRoutesCheck;
