import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";

const ConstrucaoService = () => {
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      descricao: descricao,
      dataInicio: dataInicio,
      dataFim: dataFim,
      horaInicio: horaInicio,
      horaFim: horaFim,
      status: status,
    };
    try {
      const response = await axios.post(
        "https://api-cloud-gerencia.herokuapp.com/api/construcao/",
        data,
        config
      );
      navigate("/listarConstrucao");
    } catch (error) {
      console.log(error);
    }
  };

  const limparCampos = () => {
    setDescricao("");
    setDataInicio("");
    setDataFim("");
    setHoraInicio("");
    setHoraFim("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  const validarCampos = () => {
    if (
      descricao === "" ||
      dataInicio === "" ||
      dataFim === "" ||
      horaInicio === "" ||
      horaFim === ""
    ) {
      alert("Preencha todos os campos!");
    }
  };

  const onClickListar = () => {
    navigate("/listarConstrucao");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Cadastrar Construção</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Descrição</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Data Inicio</label>
                  <input
                    required
                    type="date"
                    className="form-control"
                    placeholder="Data Inicio"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Data Fim</label>
                  <input
                    required
                    type="date"
                    className="form-control"
                    placeholder="Data Fim"
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Hora Inicio</label>
                  <input
                    required
                    type="time"
                    className="form-control"
                    placeholder="Hora Inicio"
                    value={horaInicio}
                    onChange={(e) => setHoraInicio(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Hora Fim</label>
                  <input
                    required
                    type="time"
                    className="form-control"
                    placeholder="Hora Fim"
                    value={horaFim}
                    onChange={(e) => setHoraFim(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="0">Selecione</option>
                    <option value="1">Em Andamento</option>
                    <option value="2">Finalizada</option>
                  </select>
                </div>

                <div className="card-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Cadastrar
                  </button>

                  <button
                    style={{ marginLeft: "10px" }}
                    type="submit"
                    className="btn btn-danger"
                    onClick={limparCampos}
                  >
                    Limpar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstrucaoService;
