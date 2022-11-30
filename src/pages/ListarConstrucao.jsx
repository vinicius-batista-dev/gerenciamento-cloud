import React from "react";
import { Link, redirect, useNavigation } from "react-router-dom";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Modal, Button, Form } from "react-bootstrap";

function ListarConstrucao() {
  const [construcao, setConstrucao] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [nomeDaObra, setNomeDaObra] = useState("");
  const [categoriaObra, setCategoriaObra] = useState("");
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [estado, setEstado] = useState("");
  const [endereco, setEndereco] = useState("");
  const [email, setEmail] = useState("");
  const [proprietario, setProprietario] = useState("");
  const [telefone, setTelefone] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");
  const [valor, setValor] = useState("");
  const [imagem, setImagem] = useState("");
  const [status, setStatus] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const api = "https://api-cloud-gerencia.herokuapp.com/api/construcao/";

  const data = {
    descricao: descricao,
    dataInicio: dataInicio,
    dataFim: dataFim,
    horaInicio: horaInicio,
    horaFim: horaFim,
    nomeDaObra: nomeDaObra,
    categoriaObra: categoriaObra,
    cep: cep,
    bairro: bairro,
    estado: estado,
    endereco: endereco,
    email: email,
    proprietario: proprietario,
    telefone: telefone,
    complemento: complemento,
    cidade: cidade,
    valor: valor,
    imagem: imagem,
    status: status,
  };

  const listarConstrucao = async () => {
    try {
      const response = await axios.get(api, config, data);
      setConstrucao(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(api + id, config);
      listarConstrucao();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(api + id, config);
      setDescricao(response.data.descricao);
      setDataInicio(response.data.dataInicio);
      setDataFim(response.data.dataFim);
      setHoraInicio(response.data.horaInicio);
      setHoraFim(response.data.horaFim);
      setId(response.data.id);
      setShow(true);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => setShow(false);

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        api + id,
        {
          descricao: descricao,
          dataInicio: dataInicio,
          dataFim: dataFim,
          horaInicio: horaInicio,
          horaFim: horaFim,
          nomeDaObra: nomeDaObra,
          categoriaObra: categoriaObra,
          cep: cep,
          bairro: bairro,
          estado: estado,
          endereco: endereco,
          email: email,
          proprietario: proprietario,
          telefone: telefone,
          complemento: complemento,
          cidade: cidade,
          valor: valor,
          status: status,
        },
        config
      );
      listarConstrucao();
      setShow(false);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const formataData = (data) => {
    const dataFormatada = new Date(data);
    return dataFormatada.toLocaleDateString("pt-BR");
  };

  //Ao clicar no botao pendente, o status da obra muda para pendent
  const handlePendente = async (id) => {
    try {
      const response = await axios.put(
        api + id,
        {
          status: "pendente",
        },
        config
      );
      listarConstrucao();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <br />
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/construcaoService")}
            >
              Cadastrar
            </button>
            <Button variant="contained" onClick={listarConstrucao}>
              Listar
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
                    <TableCell align="right">Descrição</TableCell>
                    <TableCell align="right">Data Início</TableCell>
                    <TableCell align="right">Data Fim</TableCell>
                    <TableCell align="right">Hora Início</TableCell>
                    <TableCell align="right">Hora Fim</TableCell>
                    <TableCell align="right">Nome da Obra</TableCell>
                    <TableCell align="right">Categoria da Obra</TableCell>
                    <TableCell align="right">CEP</TableCell>
                    <TableCell align="right">Bairro</TableCell>
                    <TableCell align="right">Estado</TableCell>
                    <TableCell align="right">Endereço</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Proprietário</TableCell>
                    <TableCell align="right">Telefone</TableCell>
                    <TableCell align="right">Complemento</TableCell>
                    <TableCell align="right">Cidade</TableCell>
                    <TableCell align="right">Valor</TableCell>
                    <TableCell align="right">Status</TableCell>

                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {construcao.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.descricao}</TableCell>
                      <TableCell align="right">
                        {formataData(row.dataInicio)}
                      </TableCell>
                      <TableCell align="right">
                        {formataData(row.dataFim)}
                      </TableCell>
                      <TableCell align="right">{row.horaInicio}</TableCell>
                      <TableCell align="right">{row.horaFim}</TableCell>
                      <TableCell align="right">{row.nomeDaObra}</TableCell>
                      <TableCell align="right">{row.categoriaObra}</TableCell>
                      <TableCell align="right">{row.cep}</TableCell>
                      <TableCell align="right">{row.bairro}</TableCell>
                      <TableCell align="right">{row.estado}</TableCell>
                      <TableCell align="right">{row.endereco}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.proprietario}</TableCell>
                      <TableCell align="right">{row.telefone}</TableCell>
                      <TableCell align="right">{row.complemento}</TableCell>
                      <TableCell align="right">{row.cidade}</TableCell>
                      <TableCell align="right">{row.valor}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleEdit(row.id)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDelete(row.id)}
                        >
                          Excluir
                        </button>
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
          <Modal.Title>Editar Construção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Data Início</Form.Label>
              <Form.Control
                type="date"
                placeholder="Data Início"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Data Fim</Form.Label>
              <Form.Control
                type="date"
                placeholder="Data Fim"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Hora Início</Form.Label>
              <Form.Control
                type="time"
                placeholder="Hora Início"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Hora Fim</Form.Label>
              <Form.Control
                type="time"
                placeholder="Hora Fim"
                value={horaFim}
                onChange={(e) => setHoraFim(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListarConstrucao;
