import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import { Link, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { Navigate } from "react-router-dom";

import { Button, Form } from "react-bootstrap";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useAuth();

  const navigate = useNavigate();

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

  const data = {
    email,
    password,
  };

  const api = "https://api-cloud-gerencia.herokuapp.com/api/auth/signin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(api, data, config);
    console.log(response);
    if (response.data.error) {
      setError(response.data.error);
    } else {
      setToken(response.data.token);
    }
  };

  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/listarConstrucao" />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <h1 className="text-center">Bem Vindo a Pagina de Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="Digite o email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Entrar
            </Button>
            <Link to="/signup">Cadastre-se</Link>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
