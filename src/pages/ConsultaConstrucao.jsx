import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, redirect, useNavigation } from "react-router-dom";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import { Button } from "@mui/material";
import { Form, Modal } from "react-bootstrap";
import { SearchIcon } from "@mui/icons-material";
import { Search } from "@material-ui/icons";

const ConsultaConstrucao = () => {
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
  const [searched, setSearched] = useState("");
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  if (!localStorage.getItem("token")) {
    navigate("/");
  }

  const api = "http://localhost:4000/api/construcao";

  const listarConstrucao = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .get(api, config)
      .then((response) => {
        setConstrucao(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setId(id);
    setShow(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(api + "/" + id, config).then((response) => {
      listarConstrucao();
      handleClose();
    });
  };

  const handleEdit = async (id) => {
    await axios.get(api + "/" + id, config).then((response) => {
      setId(response.data.id);
      setDescricao(response.data.descricao);
      setDataInicio(response.data.dataInicio);
      setDataFim(response.data.dataFim);
      setHoraInicio(response.data.horaInicio);
      setHoraFim(response.data.horaFim);
      setNomeDaObra(response.data.nomeDaObra);
      setCategoriaObra(response.data.categoriaObra);
      setCep(response.data.cep);
      setBairro(response.data.bairro);
      setEstado(response.data.estado);
      setEndereco(response.data.endereco);
      setEmail(response.data.email);
      setProprietario(response.data.proprietario);
      setTelefone(response.data.telefone);
      setComplemento(response.data.complemento);
      setCidade(response.data.cidade);
      setValor(response.data.valor);
      setImagem(response.data.imagem);
      setStatus(response.data.status);
      handleClose();
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      id: id,
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

    await axios.put(api, data, config).then((response) => {
      listarConstrucao();
    });
  };

  const formataData = (data) => {
    const dataFormatada = new Date(data);
    return dataFormatada.toLocaleDateString("pt-BR");
  };

  useEffect(() => {
    listarConstrucao();
  }, []);

  const requestSearch = (searchedVal) => {
    const filteredRows = construcao.filter((row) => {
      return row.nomeDaObra.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setConstrucao(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
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
            <Button
              style={{ marginLeft: "10px" }}
              variant="contained"
              onClick={listarConstrucao}
            >
              Listar
            </Button>
          </div>
          <br />
          <br />
          <div className="col-12">
            <div className="input-group">
              <SearchBar
                placeholder="Buscar"
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
              />
            </div>
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
};

export default ConsultaConstrucao;
