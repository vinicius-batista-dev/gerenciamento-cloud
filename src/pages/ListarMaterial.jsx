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

  const listarMaterial = async () => {
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

  const atualizarMaterial = async (id) => {
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
      listarMaterial();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const deletarMaterial = async (id) => {
    try {
      const response = await axios.delete(
        `https://api-cloud-gerencia.herokuapp.com/api/produtos/${id}`,
        config
      );
      listarMaterial();
    } catch (error) {
      console.log(error);
    }
  };

  const formataData = (data) => {
    let dataFormatada = new Date(data);
    return dataFormatada.toLocaleDateString();
  };

  return (
    <div>
      <div className="container">
        <div className="col-12">
          <h1>Gestao de Material</h1>
        </div>

        <div className="row">
          <div className="col-12">
            <br />
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/materialService")}
            >
              Cadastrar
            </button>
            <Button variant="contained" onClick={listarMaterial}>
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
                    <TableCell align="right">Nome</TableCell>
                    <TableCell align="right">Descrição</TableCell>
                    <TableCell align="right">Quantidade</TableCell>
                    <TableCell align="right">Preço</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Fornecedor</TableCell>
                    <TableCell align="right">Data Entrada</TableCell>
                    <TableCell align="right">Data Saida</TableCell>
                    <TableCell align="right">Categoria</TableCell>
                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {materiais.map((material) => (
                    <TableRow
                      key={material.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {material.id}
                      </TableCell>
                      <TableCell align="right">{material.nome}</TableCell>
                      <TableCell align="right">{material.descricao}</TableCell>
                      <TableCell align="right">{material.quantidade}</TableCell>
                      <TableCell align="right">{material.preco}</TableCell>
                      <TableCell align="right">{material.status}</TableCell>
                      <TableCell align="right">{material.fornecedor}</TableCell>
                      <TableCell align="right">
                        {formataData(material.data_entrada)}
                      </TableCell>
                      <TableCell align="right">
                        {formataData(material.data_saida)}
                      </TableCell>
                      <TableCell align="right">{material.categoria}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          onClick={() => {
                            handleShow();
                            setNome(material.nome);
                            setDescricao(material.descricao);
                            setQuantidade(material.quantidade);
                            setPreco(material.preco);
                            setStatus(material.status);
                            setFornecedor(material.fornecedor);
                            setDataEntrada(material.data_entrada);
                            setDataSaida(material.data_saida);
                            setCategoria(material.categoria);
                          }}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => {
                            atualizarMaterial(material.id);
                          }}
                        >
                          Atualizar
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => {
                            deletarMaterial(material.id);
                          }}
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
          <Modal.Title>Editar Material</Modal.Title>
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

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="text"
                placeholder="Preço"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Status</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Disponivel">Disponivel</option>
                <option value="Indisponivel">Indisponivel</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Fornecedor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Fornecedor"
                value={fornecedor}
                onChange={(e) => setFornecedor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Data Entrada</Form.Label>
              <Form.Control
                type="date"
                placeholder="Data Entrada"
                value={data_entrada}
                onChange={(e) => setDataEntrada(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Data Saida</Form.Label>
              <Form.Control
                type="date"
                placeholder="Data Saida"
                value={data_saida}
                onChange={(e) => setDataSaida(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Categoria</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="Eletrônico">Eletrônico</option>
                <option value="Móvel">Móvel</option>
                <option value="Eletrodoméstico">Eletrodoméstico</option>
                <option value="Outros">Outros</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListarMaterial;
