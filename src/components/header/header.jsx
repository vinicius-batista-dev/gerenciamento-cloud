import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const navigate = useNavigate();

  //Ao clicar no botao de construcao service tera um alerta para o usuario logar
  if (window.location.pathname === "/construcaoService") {
    alert("Por favor, deve estar logado");
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <span className="ms-2">Bem Vindo</span>
        </Link>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link active">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/construcaoService" className="nav-link">
              Service
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/listarConstrucao" className="nav-link">
              ListarConstrucao
            </Link>
          </li>
          <li className="nav-item">
            <Link onClick={handleLogout} to="/signin" className="nav-link">
              Sair
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
