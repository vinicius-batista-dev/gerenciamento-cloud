import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, redirect, useNavigation } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Bem Vindo</h1>
          <p>
            Seja bem vindo ao nossa API.
          </p>
        </div>
        <p>
          <Link to="/signin">Testar Sistema</Link>
        </p>
      </div>  
    </div>
  );
};

export default Home;
