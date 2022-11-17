import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/construcaoService">
                Construcao
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/listarConstrucao">
                Listar Construcao
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/consultaConstrucao">
                Consultar Construcao
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
