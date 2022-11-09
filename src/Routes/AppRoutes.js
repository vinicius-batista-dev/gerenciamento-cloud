import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import SignIn from "../pages/Signin";
import SignUp from "../pages/Signup";
import ListarConstrucao from "../pages/ListarConstrucao";
import ContrucaoService from "../pages/ConstrucaoService";
import { useAuth } from "../contexts/auth";

const PrivateRouter = ({ element, redirect, isLogged }) => {
  return <>{isLogged ? element : <Navigate to={redirect} />}</>;
};

const AppRoutes = () => {
  const { token } = useAuth();

  const [isLogged, setIslogged] = useState(!!token);

  useEffect(() => {
    setIslogged(!!token);
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} isLogged={isLogged} />

        <Route
          path="/construcaoService"
          element={
            <PrivateRouter
              element={<ContrucaoService />}
              redirect="/signin"
              isLogged={isLogged}
            />
          }
        />

        <Route
          path="/listarConstrucao"
          element={
            <PrivateRouter
              element={<ListarConstrucao />}
              redirect="/signin"
              isLogged={isLogged}
            />
          }
        />

        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
