import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Modal, Button, Form, CardImg } from "react-bootstrap";
import { ButtonBase, Select } from "@mui/material";
import { Delete, Edit } from "@material-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Deve trazer os dados do funcionario para o modal
  const handleEditar = async (id) => {
    try {
      const response = await axios.put(
        `https://api-cloud-gerencia.herokuapp.com/api/funcionario/${id}`,
        config
      );
      setId(response.data.id);
      setNome(response.data.nome);
      setEmail(response.data.email);
      setCargo(response.data.cargo);
      setSalario(response.data.salario);
      setCpf(response.data.cpf);
      setDataNascimento(response.data.dataNascimento);
      setDataAdmissao(response.data.dataAdmissao);
      setDataDemissao(response.data.dataDemissao);
      setStatus(response.data.status);
      handleShow();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://api-cloud-gerencia.herokuapp.com/api/funcionario/${id}`,
        config
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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

  const formataData = (data) => {
    const dataFormatada = new Date(data);
    return dataFormatada.toLocaleDateString("pt-BR");
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Gestao de Funcionarios</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Button variant="primary" onClick={handleListar}>
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
                    <TableCell align="right">Data de Nascimento</TableCell>
                    <TableCell align="right">Data de Admissao</TableCell>
                    <TableCell align="right">Data de Demissao</TableCell>
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
                        {formataData(funcionario.dataNascimento)}
                      </TableCell>
                      <TableCell align="right">
                        {formataData(funcionario.dataAdmissao)}
                      </TableCell>
                      <TableCell align="right">
                        {formataData(funcionario.dataDemissao)}
                      </TableCell>
                      <TableCell align="right">{funcionario.status}</TableCell>
                      <TableCell align="right">
                        <Button variant="primary" onClick={handleShow}>
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(funcionario.id)}
                        >
                          Deletar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Funcionario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="PUT" onSubmit={handleEditar}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Nome" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Cargo</Form.Label>
              <Form.Control type="text" placeholder="Cargo" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Salario</Form.Label>
              <Form.Control type="text" placeholder="Salario" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>CPF</Form.Label>
              <Form.Control type="text" placeholder="CPF" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control type="date" placeholder="Data de Nascimento" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Data de Admissao</Form.Label>
              <Form.Control type="date" placeholder="Data de Admissao" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Data de Demissao</Form.Label>
              <Form.Control type="date" placeholder="Data de Demissao" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" placeholder="Status" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Editar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ListarFuncionario;
