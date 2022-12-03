import React, { useState } from "react";

import axios from "axios";
import { Link, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { Navigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

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

  const api = " https://api-cloud-gerencia.herokuapp.com/api/auth/signin";

  //apos o login, o toke e o email sao armazenados no localstorage
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(api, data, config);
      setToken(response.data.accessToken);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.email);
      navigate("/construcaoService");
    } catch (error) {
      setError("Email ou senha incorretos");
    }
  };

  //Deve definir outros emails

  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/listaConstrucao" />;
  }

  const validarCampos = () => {
    if (email === "" || password === "") {
      alert("Preencha todos os campos");
      return false;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Pagina de Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Esqueci minha senha"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={validarCampos}
          >
            Logar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu sua senha?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Não tem uma conta? Cadastre-se"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
