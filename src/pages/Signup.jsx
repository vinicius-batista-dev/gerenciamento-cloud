import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //Liberar o cors
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

  const handleSumit = async (e) => {
    e.preventDefault();
    try {
      if (response.status === 200) {
        return <Navigate to="/signin" />;
      }
      const response = await axios.post(
        "https://api-cloud-gerencia.herokuapp.com/api/auth/signup",
        {
          username,
          email,
          password,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };
  

  //Se receber um status 200, redireciona para a pagina de login

  const limparCampos = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <h1 className="text-center">Cadastro</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <form onSubmit={handleSumit}>
                    <div className="form-group">
                      <label htmlFor="username">Nome</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Digite seu nome"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        required
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Senha</label>
                      <input
                        required
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Cadastrar
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={limparCampos}
                        >
                          Limpar
                        </button>
                        <p>
                          Já possui uma conta? <a href="/signin">Entrar</a>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
