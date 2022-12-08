import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Modal, Button, Form, CardImg } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ListarFuncionario = () => {
  const [id, setId] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [cargo, setCargo] = React.useState("");
  const [salario, setSalario] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [dataNascimento, setDataNascimento] = React.useState("");
  const [dataAdmissao, setDataAdmissao] = React.useState("");
  const [dataDemissao, setDataDemissao] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [construcao, setConstrucao] = React.useState([]);

  const [funcionarios, setFuncionarios] = React.useState([]);

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const api = "https://api-cloud-gerencia.herokuapp.com/api/funcionario";

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

  const handleListar = async () => {
    try {
      const response = await axios.get(
        "https://api-cloud-gerencia.herokuapp.com/api/funcionario",
        config
      );
      setFuncionarios(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(api + "/" + id, data, config);
      handleListar();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(api + "/" + id, config);
      handleListar();
    } catch (error) {
      console.log(error);
    }
  };

  const converterData = (data) => {
    const dataFormatada = new Date(data);
    const dia = dataFormatada.getDate();
    const mes = dataFormatada.getMonth() + 1;
    const ano = dataFormatada.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Gestao de Funcionarios</h1>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/funcionarioService")}
          >
            Cadastrar Funcionario
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleListar}
            style={{ marginLeft: "10px" }}
          >
            Listar Funcionarios
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="right">Nome</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Cargo</TableCell>
                  <TableCell align="right">Salario</TableCell>
                  <TableCell align="right">CPF</TableCell>
                  <TableCell align="right">Data Nascimento</TableCell>
                  <TableCell align="right">Data Admissao</TableCell>
                  <TableCell align="right">Data Demissao</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Acoes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {funcionarios.map((funcionario) => (
                  <TableRow
                    key={funcionario.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {funcionario.id}
                    </TableCell>
                    <TableCell align="right">{funcionario.nome}</TableCell>
                    <TableCell align="right">{funcionario.email}</TableCell>
                    <TableCell align="right">{funcionario.cargo}</TableCell>
                    <TableCell align="right">{funcionario.salario}</TableCell>
                    <TableCell align="right">{funcionario.cpf}</TableCell>
                    <TableCell align="right">
                      {converterData(funcionario.dataNascimento)}
                    </TableCell>
                    <TableCell align="right">
                      {converterData(funcionario.dataAdmissao)}
                    </TableCell>
                    <TableCell align="right">
                      {converterData(funcionario.dataDemissao)}
                    </TableCell>
                    <TableCell align="right">{funcionario.status}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleShow();
                          setId(funcionario.id);
                          setNome(funcionario.nome);
                          setEmail(funcionario.email);
                          setCargo(funcionario.cargo);
                          setSalario(funcionario.salario);
                          setCpf(funcionario.cpf);
                          setDataNascimento(funcionario.dataNascimento);
                          setDataAdmissao(funcionario.dataAdmissao);
                          setDataDemissao(funcionario.dataDemissao);
                          setStatus(funcionario.status);
                        }}
                      >
                        Editar
                      </Button>

                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(funcionario.id)}
                        style={{ marginLeft: "10px" }}
                      >
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Funcionario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Cargo</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
              >
                <option value="Carpinteiro">Carpinteiro</option>
                <option value="Pedreiro">Pedreiro</option>
                <option value="Pintor">Pintor</option>
                <option value="Eletricista">Eletricista</option>
                <option value="Encanador">Encanador</option>
                <option value="Jardineiro">Jardineiro</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Salario</Form.Label>
              <Form.Control
                type="number"
                placeholder="Salario"
                value={salario}
                onChange={(e) => setSalario(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                placeholder="CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Data Nascimento</Form.Label>
              <Form.Control
                type="date"
                placeholder="Data Nascimento"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Data Admissao</Form.Label>
              <Form.Control
                type="date"
                placeholder="Data Admissao"
                value={dataAdmissao}
                onChange={(e) => setDataAdmissao(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Data Demissao</Form.Label>
              <Form.Control
                type="date"
                placeholder="Data Demissao"
                value={dataDemissao}
                onChange={(e) => setDataDemissao(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Status</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" onClick={handleUpdate}>
              Editar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ListarFuncionario;
