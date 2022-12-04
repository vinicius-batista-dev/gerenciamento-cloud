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
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Visibility } from "@material-ui/icons";
import { Delete } from "@mui/icons-material";

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

  //Verificar o token e atualizar a pagina
  if (!localStorage.getItem("token")) {
    navigate("/");
  }

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

  const handleShow = (id) => {
    setShow(true);
    setId(id);
  };

  const handleClose = () => {
    setShow(false);
  };

  const showModal = (id) => {
    axios
      .get(`http://localhost:5000/api/construcao/${id}`, config)
      .then((response) => {
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
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  };

  const handleCloseModal = () => {
    setShow(false);
  };

  const handleShowDelete = (id) => {
    setId(id);
  };

  const handleDelete = (id) => {
    axios
      .delete(
        "https://api-cloud-gerencia.herokuapp.com/api/construcao/" + id,
        config
      )
      .then((response) => {
        if (response.status === 200) {
          alert("Construção deletada com sucesso!");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const abrirModal = (id) => {
    axios
      .get(
        "https://api-cloud-gerencia.herokuapp.com/api/construcao/" + id,
        config
      )
      .then((response) => {
        if (response.status === 200) {
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
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getConstrucao = () => {
    axios
      .get("https://api-cloud-gerencia.herokuapp.com/api/construcao", config)
      .then((response) => {
        if (response.status === 200) {
          setConstrucao(response.data);
          setLoading(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getConstrucao();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                      <h4 className="mb-0 font-size-18">Construções</h4>
                      <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                          <li className="breadcrumb-item">
                            <Link to="/dashboard">Dashboard</Link>
                          </li>
                          <li className="breadcrumb-item active">
                            Construções
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="text-sm-right">
                              <Link
                                to="/construcaoService"
                                className="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2"
                              >
                                <i className="mdi mdi-plus mr-1"></i> Cadastrar
                                Construção
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="table-responsive">
                          <table className="table table-centered table-nowrap mb-0">
                            <thead className="thead-light">
                              <tr>
                                <th>Nome da Obra</th>
                                <th>Proprietário</th>
                                <th>Telefone</th>
                                <th>Endereço</th>
                                <th>Status</th>
                                <th>Ações</th>
                              </tr>
                            </thead>
                            <tbody>
                              {loading ? (
                                construcao.map((construcao) => (
                                  <tr key={construcao.id}>
                                    <td>
                                      <h5 className="text-truncate font-size-14">
                                        {construcao.nomeDaObra}
                                      </h5>
                                    </td>
                                    <td>{construcao.proprietario}</td>
                                    <td>{construcao.telefone}</td>
                                    <td>{construcao.endereco}</td>
                                    <td>
                                      <span className="badge badge-soft-success font-size-12">
                                        {construcao.status}
                                      </span>
                                    </td>
                                    <td>
                                      <div className="button-items">
                                        <button
                                          type="button"
                                          className="btn btn-primary btn-sm waves-effect waves-light"
                                          onClick={() => {
                                            abrirModal(construcao.id);
                                            handleShow();
                                          }}
                                        >
                                          <i className="bx bx-show-alt"></i>
                                        </button>
                                        <Link
                                          to={
                                            "/construcao/editar/" +
                                            construcao.id
                                          }
                                          className="btn btn-success btn-sm waves-effect waves-light"
                                        >
                                          <i className="bx bx-edit"></i>
                                        </Link>
                                        <button
                                          type="button"
                                          className="btn btn-danger btn-sm waves-effect waves-light"
                                          onClick={() => {
                                            abrirModal(construcao.id);
                                            handleShowDelete();
                                          }}
                                        >
                                          <i className="bx bx-trash"></i>
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="6">Carregando...</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                        <div className="row">
                          <div className="col-sm-12 col-md-5">
                            <div
                              className="dataTables_info"
                              id="datatable_info"
                              role="status"
                              aria-live="polite"
                            >
                              Mostrando 1 a 10 de 57 entradas
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-7">
                            <div
                              className="dataTables_paginate paging_simple_numbers"
                              id="datatable_paginate"
                            >
                              <ul className="pagination">
                                <li
                                  className="paginate_button page-item previous disabled"
                                  id="datatable_previous"
                                >
                                  <a
                                    href="#"
                                    aria-controls="datatable"
                                    data-dt-idx="0"
                                    tabIndex="0"
                                    className="page-link"
                                  >
                                    Anterior
                                  </a>
                                </li>
                                <li className="paginate_button page-item active">
                                  <a
                                    href="#"
                                    aria-controls="datatable"
                                    data-dt-idx="1"
                                    tabIndex="0"
                                    className="page-link"
                                  >
                                    1
                                  </a>
                                </li>
                                <li className="paginate_button page-item ">
                                  <a
                                    href="#"
                                    aria-controls="datatable"
                                    data-dt-idx="2"
                                    tabIndex="0"
                                    Waiting
                                    className="page-link"
                                  >
                                    2
                                  </a>
                                </li>
                                <li className="paginate_button page-item ">
                                  <a
                                    href="#"
                                    aria-controls="datatable"
                                    data-dt-idx="3"
                                    tabIndex="0"
                                    className="page-link"
                                  >
                                    3
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes da Construção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="nomeDaObra">Nome da Obra</label>
                <input
                  type="text"
                  className="form-control"
                  id="nomeDaObra"
                  name="nomeDaObra"
                  value={nomeDaObra}
                  onChange={(e) => setNomeDaObra(e.target.value)}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="proprietario">Proprietário</label>
                <input
                  type="text"
                  className="form-control"
                  id="proprietario"
                  name="proprietario"
                  value={proprietario}
                  onChange={(e) => setProprietario(e.target.value)}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="telefone">Telefone</label>
                <input
                  type="text"
                  className="form-control"
                  id="telefone"
                  name="telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="endereco">Endereço</label>
                <input
                  type="text"
                  className="form-control"
                  id="endereco"
                  name="endereco"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="dataInicio">Data de Início</label>
                <input
                  type="text"
                  className="form-control"
                  id="dataInicio"
                  name="dataInicio"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="dataFim">Data de Fim</label>
                <input
                  type="text"
                  className="form-control"
                  id="dataFim"
                  name="dataFim"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="valor">Valor</label>
                <input
                  type="text"
                  className="form-control"
                  id="valor"
                  name="valor"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <input
                  type="text"
                  className="form-control"
                  id="status"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  disabled
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ConsultaConstrucao;
