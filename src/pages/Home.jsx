import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, redirect, useNavigation } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3>=D</h3>
            </div>
            <div className="card-body">
              <h5 className="card-title">
                Bem vindo ao sistema de gerenciamento de construção!
              </h5>
              <p className="card-text">
                Para utilizar o sistema, acesse o menu superior.
              </p>
              <p>
                O objetivo deste sistema consiste em ajudar as empresas de
                construcao civil, a gerenciar o tempo de suas obras, e assim,
                ter uma melhor visao do andamento{" "}
              </p>
              <Link to="/listarConstrucao" className="btn btn-primary">
                Listar Construções
              </Link>

              <Link to="/signin" className="btn btn-primary">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
