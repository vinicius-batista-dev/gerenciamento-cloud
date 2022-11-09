import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, redirect, useNavigation } from "react-router-dom";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { SearchField } from "react-bootstrap-table";

function ListarConstrucao() {
  const [construcao, setConstrucao] = useState([]);

  const [show, setShow] = useState(false);
  const [close, setClose] = useState(false);

  const [id, setId] = useState("");
  const [Descricao, setDescricao] = useState("");
  const [DataInicio, setDataInicio] = useState("");
  const [DataFim, setDataFim] = useState("");
  const [HoraInicio, setHoraInicio] = useState("");
  const [HoraFim, setHoraFim] = useState("");

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const listarConstrucao = async () => {
    const response = await axios.get(
      "https://api-cloud-gerencia.herokuapp.com/api/construcao/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setConstrucao(response.data);
  };

  const deletarConstrucao = async (id) => {
    await axios.delete(
      `https://api-cloud-gerencia.herokuapp.com/api/construcao/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    listarConstrucao();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = async (id) => {
    // e.preventDefault();

    const response = await axios.put(
      `https://api-cloud-gerencia.herokuapp.com/api/construcao/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);

    listarConstrucao();

    handleClose();
  };

  const trazerDadosModal = (id) => {
    setId(id);
  };

  const formatarData = (data) => {
    const dataFormatada = new Date(data);
    return dataFormatada.toLocaleDateString("pt-BR");
  };

  const handleSearch = (e) => {
    setSearch(e);
  };

  const filteredConstrucao = construcao.filter((construcao) => {
    return construcao.descricao.toLowerCase().includes(search.toLowerCase());
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Construções</h1>
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-6">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      listarConstrucao();
                    }}
                  >
                    Listar Construções
                  </button>
                </div>
                <div className="col-6">
                  <button className="btn btn-primary" onClick={handleLogout}>
                    Sair
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <input
                type="text"
                placeholder="Pesquisar"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Data Início</th>
                    <th>Data Fim</th>
                    <th>Hora Início</th>
                    <th>Hora Fim</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredConstrucao.map((construcao) => (
                    <tr key={construcao.id}>
                      <td>{construcao.descricao}</td>
                      <td>{formatarData(construcao.dataInicio)}</td>
                      <td>{formatarData(construcao.dataFim)}</td>
                      <td>{construcao.horaInicio}</td>
                      <td>{construcao.horaFim}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deletarConstrucao(construcao.id);
                          }}
                        >
                          Deletar
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            handleShow();
                            trazerDadosModal(construcao.id);
                          }}
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Construção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <label>Descrição</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label>Data Início</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label>Data Fim</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => setDataFim(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label>Hora Início</label>
              <input
                type="time"
                className="form-control"
                onChange={(e) => setHoraInicio(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label>Hora Fim</label>
              <input
                type="time"
                className="form-control"
                onChange={(e) => setHoraFim(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="secondary" onClick={handleEdit}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListarConstrucao;
