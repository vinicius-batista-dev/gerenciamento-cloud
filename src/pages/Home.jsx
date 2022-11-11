import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, redirect, useNavigation } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                Bem vindo ao sistema de gerenciamento de construção!
              </h5>
              <p className="card-text">
                Para utilizar o sistema, acesse o menu superior.
              </p>
              <p>
                O objetivo deste sistema consiste em ajudar as empresas de
                construcao civil, a administrar o tempo de suas obras.
              </p>
              <Link to="/signin" className="btn btn-primary">
                Acessar o sistema
              </Link>
            </div>
          </div>
          <div className="card-footer text-muted">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <p className="text-center">
                  Desenvolvido por:{" "}
                  <a href="vinicius-batista" target="_blank">
                    Vinicius Batista
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
