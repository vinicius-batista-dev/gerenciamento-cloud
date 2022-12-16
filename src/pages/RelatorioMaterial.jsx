import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, redirect, useNavigation } from "react-router-dom";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import jsPDF from "jspdf";

const RelatorioMaterial = () => {
  const [nome, setNome] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [quantidade, setQuantidade] = React.useState("");
  const [preco, setPreco] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [data_entrada, setDataEntrada] = React.useState("");
  const [data_saida, setDataSaida] = React.useState("");
  const [categoria, setCategoria] = React.useState("");
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [material, setMaterial] = useState([]);

  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const handleShow = (id) => {
    setShow(true);
    setId(id);
  };

  const handleClose = () => {
    setShow(false);
  };

  const abrirModal = (id) => {
    axios
      .get("http://localhost:5000/api/produtos/" + id, config)
      .then((response) => {
        setNome(response.data.nome);
        setDescricao(response.data.descricao);
        setQuantidade(response.data.quantidade);
        setPreco(response.data.preco);
        setStatus(response.data.status);
        setDataEntrada(response.data.data_entrada);
        setDataSaida(response.data.data_saida);
        setCategoria(response.data.categoria);
        handleShow();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMateriais = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/produtos",
        config
      );
      setMaterial(response.data);
      if (response.data.length === 0) {
        alert("Não há material cadastrado!");
        navigate("/materialService");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMateriais();
  }, []);

  const gerarRelatorio = () => {
    pdf();
  };

  const formatarData = (data) => {
    const dataFormatada = new Date(data);
    return dataFormatada.toLocaleDateString("pt-BR");
  };

  const pdf = () => {
    const doc = new jsPDF();
    doc.text(
      45,
      20,

      "Comprovante do material" + " da data " + formatarData(new Date())
    );
    doc.text(
      20,
      30,
      "***********************************************************************"
    );
    doc.text(20, 40, "Nome: " + nome);
    doc.text(20, 50, "Quantidade: " + quantidade);
    doc.text(20, 60, "Preço: " + preco);
    doc.text(20, 70, "Status: " + status);
    doc.text(20, 80, "Data de Saída: " + formatarData(data_saida));
    doc.text(20, 100, "Categoria: " + categoria);
    doc.text(20, 90, "Assinatura do Responsável: ");
    doc.text(
      20,
      110,
      "***********************************************************************"
    );
    doc.save("comprovante.pdf");
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
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                      <h4 className="mb-0 font-size-18">
                        Relatório de Materiais
                      </h4>
                      <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                          <li className="breadcrumb-item">
                            <Link to="/dashboard">Dashboard</Link>
                          </li>
                          <li className="breadcrumb-item active">
                            Relatório de Materiais
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
                        <div className="table-responsive">
                          <table className="table table-centered table-nowrap mb-0">
                            <thead className="thead-light">
                              <tr>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Quantidade</th>
                                <th>Preço</th>
                                <th>Status</th>
                                <th>Data de Entrada</th>
                                <th>Data de Saída</th>
                                <th>Categoria</th>
                                <th>Ações</th>
                              </tr>
                            </thead>
                            <tbody>
                              {material.map((item) => (
                                <tr key={item.id}>
                                  <td>{item.nome}</td>
                                  <td>{item.descricao}</td>
                                  <td>{item.quantidade}</td>
                                  <td>{item.preco}</td>
                                  <td>{item.status}</td>
                                  <td>{formatarData(item.data_entrada)}</td>
                                  <td>{formatarData(item.data_saida)}</td>
                                  <td>{item.categoria}</td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-sm"
                                      onClick={() => abrirModal(item.id)}
                                    >
                                      <i className="fas fa-eye"></i>
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
                <label htmlFor="nome">Nome do Material</label>
                <input
                  type="text"
                  className="form-control"
                  id="nomeDoMaterial"
                  name="nomeDoMaterial"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="descricao">Descricao</label>
                <input
                  type="text"
                  className="form-control"
                  id="descricao"
                  name="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="quantidade">Quantidade</label>
                <input
                  type="text"
                  className="form-control"
                  id="quantidade"
                  name="quantidade"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="preco">Preco</label>
                <input
                  type="text"
                  className="form-control"
                  id="preco"
                  name="preco"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="dataInicio">Data de Entrada</label>
                <input
                  type="date"
                  className="form-control"
                  id="dataInicio"
                  name="dataInicio"
                  value={data_entrada}
                  onChange={(e) => setDataEntrada(e.target.value)}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="dataFim">Data de Saida</label>
                <input
                  type="date"
                  className="form-control"
                  id="dataFim"
                  name="dataFim"
                  value={data_saida}
                  onChange={(e) => setDataSaida(e.target.value)}
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
          {/* gerarRelatorio */}
          <Button variant="primary" onClick={pdf}>
            Imprimir Comprovante
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RelatorioMaterial;
