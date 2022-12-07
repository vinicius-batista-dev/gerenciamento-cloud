import React from "react";
import {
  Typography,
  Link,
  Grid,
  Button,
  FormLabel,
  FormGroup,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { cpf } from "cpf-cnpj-validator";
import { TextField } from "@mui/material";

const FuncionarioService = () => {
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [cargo, setCargo] = React.useState("");
  const [salario, setSalario] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [dataNascimento, setDataNascimento] = React.useState("");
  const [dataAdmissao, setDataAdmissao] = React.useState("");
  const [dataDemissao, setDataDemissao] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [funcionarios, setFuncionarios] = React.useState([]);

  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const handleCadastrar = async (e) => {
    e.preventDefault();
    const data = {
      nome: nome,
      email: email,
      cargo: cargo,
      salario: salario,
      cpf: cpf,
      dataNascimento: dataNascimento,
      dataAdmissao: dataAdmissao,
      dataDemissao: dataDemissao,
      status: status,
    };
    try {
      const response = await axios.post(
        "https://api-cloud-gerencia.herokuapp.com/api/funcionario",
        data,
        config
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Typography component="div" sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" component="div" gutterBottom>
            Cadastrar Funcionário
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleCadastrar}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="nome"
                  label="Nome"
                  variant="outlined"
                  fullWidth
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="cargo"
                  label="Cargo"
                  variant="outlined"
                  fullWidth
                  required
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="salario"
                  label="Salário"
                  variant="outlined"
                  fullWidth
                  required
                  value={salario}
                  onChange={(e) => setSalario(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="cpf"
                  label="CPF"
                  variant="outlined"
                  fullWidth
                  required
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="date"
                  id="dataNascimento"
                  variant="outlined"
                  fullWidth
                  required
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="dataAdmissao"
                  type="date"
                  variant="outlined"
                  fullWidth
                  required
                  value={dataAdmissao}
                  onChange={(e) => setDataAdmissao(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="dataDemissao"
                  type="date"
                  variant="outlined"
                  fullWidth
                  required
                  value={dataDemissao}
                  onChange={(e) => setDataDemissao(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="status"
                  label="Status"
                  variant="outlined"
                  fullWidth
                  required
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Cadastrar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Typography>
  );
};

export default FuncionarioService;
