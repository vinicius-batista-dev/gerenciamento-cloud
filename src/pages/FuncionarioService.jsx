import React from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { cpf } from "cpf-cnpj-validator";

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
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3>Cadastrar Funcionário</h3>
            </div>
            <div className="card-body">
              <form method="POST" onSubmit={handleCadastrar}>
                <div className="form-group">
                  <label>Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Cargo</label>
                  <select
                    className="form-control"
                    name="cargo"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                  >
                    <option value="0">Selecione</option>
                    <option value="Carpinteiro">Carpinteiro</option>
                    <option value="Pedreiro">Pedreiro</option>
                    <option value="Eletricista">Eletricista</option>
                    <option value="Encanador">Encanador</option>
                    <option value="Pintor">Pintor</option>
                    <option value="Jardineiro">Jardineiro</option>
                    <option value="Faxineiro">Faxineiro</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Salário</label>
                  <input
                    type="text"
                    className="form-control"
                    name="salario"
                    value={salario}
                    onChange={(e) => setSalario(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>CPF</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cpf"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Data de Nascimento</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dataNascimento"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                  />
                  <small className="form-text text-muted">
                    Data de Nascimento: 10/02/2022
                  </small>
                </div>
                <div className="form-group">
                  <label>Data de Admissão</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dataAdmissao"
                    value={dataAdmissao}
                    onChange={(e) => setDataAdmissao(e.target.value)}
                  />
                  <small className="form-text text-muted">
                    Data de Admissão: 10/02/2022
                  </small>
                </div>
                <div className="form-group">
                  <label>Data de Demissão</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dataDemissao"
                    value={dataDemissao}
                    onChange={(e) => setDataDemissao(e.target.value)}
                  />
                  <small className="form-text text-muted">
                    Data de Demissão: 10/02/2022
                  </small>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    className="form-control"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="0">Selecione</option>
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>
                <br />
                <button type="submit" className="btn btn-primary">
                  Cadastrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuncionarioService;
