import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, redirect, useNavigation } from "react-router-dom";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate, Navigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { ButtonBase } from "@mui/material";

const ListarMaterial = () => {
  const [nome, setNome] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [quantidade, setQuantidade] = React.useState("");
  const [preco, setPreco] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [materiais, setMateriais] = React.useState([]);
  const [fornecedor, setFornecedor] = React.useState([]);
  const [data_entrada, setDataEntrada] = React.useState("");
  const [data_saida, setDataSaida] = React.useState("");
  const [categoria, setCategoria] = React.useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const handleListar = async () => {
    try {
      const response = await axios.get(
        "https://api-cloud-gerencia.herokuapp.com/api/produtos",
        config
      );
      setMateriais(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleListar();
  }, []);

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        `https://api-cloud-gerencia.herokuapp.com/api/produtos/${id}`,
        {
          nome,
          descricao,
          quantidade,
          preco,
          status,
          fornecedor,
          data_entrada,
          data_saida,
          categoria,
        },
        config
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://api-cloud-gerencia.herokuapp.com/api/produtos/${id}`,
        config
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(
        `https://api-cloud-gerencia.herokuapp.com/api/produtos/${id}`,
        config
      );
      setNome(response.data.nome);
      setDescricao(response.data.descricao);
      setQuantidade(response.data.quantidade);
      setPreco(response.data.preco);
      setStatus(response.data.status);
      setFornecedor(response.data.fornecedor);
      setDataEntrada(response.data.data_entrada);
      setDataSaida(response.data.data_saida);
      setCategoria(response.data.categoria);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async (id) => {
    try {
      const response = await axios.put(
        `https://api-cloud-gerencia.herokuapp.com/api/produtos/${id}`,
        {
          nome,
          descricao,
          quantidade,
          preco,
          status,
          fornecedor,
          data_entrada,
          data_saida,
          categoria,
        },
        config
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const formatarData = (data) => {
    let dataFormatada = new Date(data);
    return dataFormatada.toLocaleDateString();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center">Gestao de Materiais</h1>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <ButtonBase
                    style={{ marginRight: "10px" }}
                    variant="primary"
                    onClick={handleListar}
                    className="btn btn-primary"
                  >
                    Listar
                  </ButtonBase>
                  <ButtonBase
                    variant="primary"
                    onClick={() => navigate("/materialService")}
                    className="btn btn-primary"
                  >
                    Cadastrar
                  </ButtonBase>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell align="right">Nome</TableCell>
                          <TableCell align="right">Descrição</TableCell>
                          <TableCell align="right">Quantidade</TableCell>
                          <TableCell align="right">Preço</TableCell>
                          <TableCell align="right">Status</TableCell>
                          <TableCell align="right">Fornecedor</TableCell>
                          <TableCell align="right">Data de Entrada</TableCell>
                          <TableCell align="right">Data de Saída</TableCell>
                          <TableCell align="right">Categoria</TableCell>
                          <TableCell align="right">Ações</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {materiais.map((material) => (
                          <TableRow
                            key={material.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {material.id}
                            </TableCell>
                            <TableCell align="right">{material.nome}</TableCell>
                            <TableCell align="right">
                              {material.descricao}
                            </TableCell>
                            <TableCell align="right">
                              {material.quantidade}
                            </TableCell>
                            <TableCell align="right">
                              {material.preco}
                            </TableCell>
                            <TableCell align="right">
                              {material.status}
                            </TableCell>
                            <TableCell align="right">
                              {material.fornecedor}
                            </TableCell>
                            <TableCell align="right">
                              {formatarData(material.data_entrada)}
                            </TableCell>
                            <TableCell align="right">
                              {formatarData(material.data_saida)}
                            </TableCell>
                            <TableCell align="right">
                              {material.categoria}
                            </TableCell>
                            <TableCell align="right">
                              <ButtonBase
                                variant="primary"
                                onClick={() => handleEdit(material.id)}
                                className="btn btn-primary"
                              >
                                Editar
                              </ButtonBase>
                              <ButtonBase
                                variant="primary"
                                onClick={() => handleDelete(material.id)}
                                className="btn btn-primary"
                              >
                                Deletar
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
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Descrição</label>
                    <input
                      type="text"
                      className="form-control"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Quantidade</label>
                    <input
                      type="text"
                      className="form-control"
                      value={quantidade}
                      onChange={(e) => setQuantidade(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Preço</label>
                    <input
                      type="text"
                      className="form-control"
                      value={preco}
                      onChange={(e) => setPreco(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Status</label>
                    <input
                      type="text"
                      className="form-control"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Fornecedor</label>
                    <input
                      type="text"
                      className="form-control"
                      value={fornecedor}
                      onChange={(e) => setFornecedor(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Data de Entrada</label>
                    <input
                      type="date"
                      className="form-control"
                      value={data_entrada}
                      onChange={(e) => setDataEntrada(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Data de Saída</label>
                    <input
                      type="date"
                      className="form-control"
                      value={data_saida}
                      onChange={(e) => setDataSaida(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Categoria</label>
                    <input
                      type="text"
                      className="form-control"
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListarMaterial;
