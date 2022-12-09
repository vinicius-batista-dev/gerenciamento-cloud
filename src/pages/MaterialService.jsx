import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

const MaterialService = () => {
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

  const handleCadastrar = async (e) => {
    e.preventDefault();
    const data = {
      nome: nome,
      descricao: descricao,
      preco: preco,
      quantidade: quantidade,
      status: status,
      categoria: categoria,
      fornecedor: fornecedor,
      data_entrada: data_entrada,
      data_saida: data_saida,
    };
    try {
      const response = await axios.post(
        "https://api-cloud-gerencia.herokuapp.com/api/produtos",
        data,
        config
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Material </h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleCadastrar}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Nome</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Descrição</label>
                      <input
                        type="text"
                        className="form-control"
                        name="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Quantidade</label>
                      <input
                        type="text"
                        className="form-control"
                        name="quantidade"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Valor</label>
                      <input
                        type="text"
                        className="form-control"
                        name="valor"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        className="form-control"
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="0">Selecione</option>
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Fornecedor</label>
                      <input
                        type="text"
                        className="form-control"
                        name="fornecedor"
                        value={fornecedor}
                        onChange={(e) => setFornecedor(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Data de Entrada</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dataEntrada"
                        value={data_entrada}
                        onChange={(e) => setDataEntrada(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Data de Saída</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dataSaida"
                        value={data_saida}
                        onChange={(e) => setDataSaida(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Categoria</label>
                      <select
                        className="form-control"
                        name="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                      >
                        <option value="0">Selecione</option>
                        <option value="MaterialLimpeza">
                          Material de Limpeza
                        </option>
                        <option value="MaterialEscritorio">
                          Material de Escritório
                        </option>
                        <option value="MaterialInformatica">
                          Material de Informática
                        </option>
                        <option value="MaterialSeguranca">
                          Material de Segurança
                        </option>
                        <option value="MaterialConstrucao">
                          Material de Construção
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <br />
                <button
                  type="submit"
                  className="btn btn-primary btn-fill pull-right"
                >
                  Cadastrar
                </button>
                <div className="clearfix"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialService;
