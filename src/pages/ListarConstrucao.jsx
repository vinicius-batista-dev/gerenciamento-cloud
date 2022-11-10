import React from "react";
import { Link, redirect, useNavigation } from "react-router-dom";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
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

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const api = "https://api-cloud-gerencia.herokuapp.com/api/construcao/";

  const listarConstrucao = async () => {
    try {
      const response = await axios.get(api, config);
      setConstrucao(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  if (loading) return <div>Carregando...</div>;

  if (error) return <div>Erro ao carregar os dados</div>;

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

  const formatarData = (data) => {
    var dataFormatada = new Date(data);
    return dataFormatada.toLocaleDateString();
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Construções</h1>
            <Link to="/construcaoService" className="btn btn-primary">
              Nova Construção
            </Link>
            <button
              onClick={listarConstrucao}
              className="btn btn-primary"
              style={{ marginLeft: "10px" }}
            >
              Listar Construções
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Descrição</th>
                  <th scope="col">Data Inicio</th>
                  <th scope="col">Data Fim</th>
                  <th scope="col">Hora Inicio</th>
                  <th scope="col">Hora Fim</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {construcao.map((construcao) => (
                  <tr key={construcao.id}>
                    <th scope="row">{construcao.id}</th>
                    <td>{construcao.descricao}</td>
                    <td>{formatarData(construcao.dataInicio)}</td>
                    <td>{formatarData(construcao.dataFim)}</td>
                    <td>{construcao.horaInicio}</td>
                    <td>{construcao.horaFim}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(construcao.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(construcao.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Construção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>id</Form.Label>

              <Form.Control
                required
                type="text"
                placeholder="Descrição"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />

              <Form.Label>Descrição</Form.Label>

              <Form.Control
                required
                type="text"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Data Inicio</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="Data Inicio"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Data Fim</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="Data Fim"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Hora Inicio</Form.Label>
              <Form.Control
                required
                type="time"
                placeholder="Hora Inicio"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Hora Fim</Form.Label>
              <Form.Control
                required
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
          <Button variant="primary" onClick={() => handleUpdate(id)}>
            Save Mudanças
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListarConstrucao;
