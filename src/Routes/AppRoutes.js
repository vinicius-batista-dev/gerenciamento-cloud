import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";

import SignIn from "../pages/Signin";
import SignUp from "../pages/Signup";

import Header from "../components/header/header";
import Home from "../pages/Home";

import ConstrucaoService from "../pages/ConstrucaoService";
import ListarConstrucao from "../pages/ListarConstrucao";
import ConsultaConstrucao from "../pages/ConsultaConstrucao";

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
      <Header />
      <Routes>
        <Route path="/signin" element={<SignIn />} isLogged={isLogged} />

        <Route path="/home" element={<Home />} isLogged={isLogged} />

        <Route
          path="/construcaoService"
          element={
            <PrivateRouter
              element={<ConstrucaoService />}
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

        <Route
          path="/consultaConstrucao"
          element={
            <PrivateRouter
              element={<ConsultaConstrucao />}
              redirect="/signin"
              isLogged={isLogged}
            />
          }
        />

        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
