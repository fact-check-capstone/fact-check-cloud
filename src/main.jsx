import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import AuthSuccess from "./routes/authsuccess";
import SignIn from "./routes/signin";
import SignUp from "./routes/signup";
import PrivateRoutes from "./utils/PrivateRoutes";
import Home from "./pages/Home";
import AuthRoutesCheck from "./utils/AuthRoutesCheck";
import News from "./pages/News";
import History from "./pages/History";
import Profile from "./pages/Profile";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/" exact />
          <Route element={<News />} path="/news" exact />
          <Route element={<History />} path="/history" exact />
          <Route element={<Profile />} path="/profile" exact />
        </Route>
        <Route element={<AuthRoutesCheck />}>
          <Route element={<SignIn />} path="/login" />
          <Route element={<SignUp />} path="/register" />
          <Route element={<AuthSuccess />} path="/auth-success" />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
