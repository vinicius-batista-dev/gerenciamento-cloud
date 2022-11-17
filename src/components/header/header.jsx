import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//Deve criar uma sidebar com os links para as páginas de cada um dos componentes
//Deve criar um botão de logout que redireciona para a página de login
//Deve criar um botão de perfil que redireciona para a página de perfil
const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                Home
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/construcaoService">
                      Construcoes
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/listarConstrucao">
                      Listar Construcoes
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/consultaConstrucao">
                      Fazer Consulta
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
