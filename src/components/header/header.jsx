import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Toggle from "react-bootstrap-toggle";

const Header = () => {
  const [show, setShow] = React.useState(false);

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      return <Navigate to="/" />;
    } else {
      alert("Você não está logado");
    }
  };

  const handleToggle = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                Gerenciador de Tarefas
              </Link>
              <button
                onChange={handleToggle}
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
              <div
                className={
                  show
                    ? "collapse navbar-collapse show"
                    : "collapse navbar-collapse"
                }
                id="navbarNav"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/home"
                    >
                      Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/construcaoService">
                      Construção Service
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/listarConstrucao">
                      Listar Construção
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/consultaConstrucao">
                      Consulta Construcao
                    </Link>
                  </li>
                </ul>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger"
                type="submit"
              >
                Sair
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
