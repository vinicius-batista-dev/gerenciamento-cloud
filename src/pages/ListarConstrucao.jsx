import React, { useEffect } from "react";
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
import { Modal, Button, Form, CardImg } from "react-bootstrap";
import { ButtonBase, Select } from "@mui/material";
import { Delete, Edit } from "@material-ui/icons";
import Base64Downloader from "react-base64-downloader";
import ReactImageBase64 from "react-image-base64";
import { TableView } from "@mui/icons-material";

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
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const api = "https://api-cloud-gerencia.herokuapp.com/api/construcao";

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
    status: status,
  };

  //Deve listar a construcao com a imagem
  const listarConstrucao = () => {
    axios
      .get(api, config)
      .then((response) => {
        setConstrucao(response.data);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://api-cloud-gerencia.herokuapp.com/api/construcao/${id}`,
        config
      );
      listarConstrucao();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => setShow(false);

  const formataData = (data) => {
    const dataFormatada = new Date(data);
    return dataFormatada.toLocaleDateString("pt-BR");
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(api + "/" + id, data, config);
      listarConstrucao();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!localStorage.getItem("token")) {
    alert("Você não está logado!");
    return <Navigate to="/signin" />;
  }

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
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setId(row.id);
                            setDescricao(row.descricao);
                            setDataInicio(row.dataInicio);
                            setDataFim(row.dataFim);
                            setHoraInicio(row.horaInicio);
                            setHoraFim(row.horaFim);
                            setNomeDaObra(row.nomeDaObra);
                            setCategoriaObra(row.categoriaObra);
                            setCep(row.cep);
                            setBairro(row.bairro);
                            setEstado(row.estado);
                            setEndereco(row.endereco);
                            setEmail(row.email);
                            setProprietario(row.proprietario);
                            setTelefone(row.telefone);
                            setComplemento(row.complemento);
                            setCidade(row.cidade);
                            setValor(row.valor);
                            setStatus(row.status);
                            setShow(true);
                          }}
                        >
                          Editar
                        </Button>

                        <ButtonBase
                          onClick={() => handleDelete(row.id)}
                          style={{ width: "100%" }}
                        >
                          <Delete />
                        </ButtonBase>
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
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome da Obra</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome da Obra"
                value={nomeDaObra}
                onChange={(e) => setNomeDaObra(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Categoria da Obra</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={categoriaObra}
                onChange={(e) => setCategoriaObra(e.target.value)}
              >
                <option value="Construcao">Construcao</option>
                <option value="Reforma">Reforma</option>
                <option value="Manutencao">Manutencao</option>
                <option value="Demolicao">Demolicao</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                type="text"
                placeholder="CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Bairro</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                placeholder="Estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                type="text"
                placeholder="Endereço"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
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
              <Form.Label>Proprietário</Form.Label>
              <Form.Control
                type="text"
                placeholder="Proprietário"
                value={proprietario}
                onChange={(e) => setProprietario(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Status</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Em Progresso">Em Progresso</option>
                <option value="Finalizado">Finalizado</option>
                <option value="Cancelado">Cancelado</option>
                <option value="Pendente">Pendente</option>
              </Form.Select>
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
