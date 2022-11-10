import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Toggle from "react-bootstrap-toggle";

const Header = () => {
  const [toggle, setToggle] = React.useState(false);

  const navigate = useNavigate();

  //Ao clicar no toogle, ele mostra o menu
  const handleToggle = () => {
    setToggle(!toggle);
  };

  //Ao clicar no botão de logout, ele redireciona para a página de login
  const handleLogout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      navigate("/signin");
    } else {
      alert("Você não está logado");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              MSYS
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/construcaoService ">
                    Construcao Service
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/listarConstrucao">
                    Listar Construcao
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/consultaConstrucao">
                    Consulta Construcao
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    onClick={handleLogout}
                    className="nav-link"
                    to="/signin"
                  >
                    Sair
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
