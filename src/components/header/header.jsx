import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const [search, setSearch] = React.useState("");

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Bem Vindo
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/construcaoService">
              Construcao Service
            </Link>
            <Link className="nav-link" to="/listarConstrucao">
              Listar Construcao
            </Link>
            <Link onClick={logout} className="nav-link" to="/">
              Sair
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
