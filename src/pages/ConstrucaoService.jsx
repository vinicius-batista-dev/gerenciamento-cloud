import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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

  //Deve salvar a foto no banco de dados
  const handleTakePhoto = (dataUri) => {
    // Do stuff with the photo...
    console.log("takePhoto");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Cadastro de Construção</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label>Descrição</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Data Início</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Data Início"
                        value={dataInicio}
                        onChange={(e) => setDataInicio(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Data Fim</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Data Fim"
                        value={dataFim}
                        onChange={(e) => setDataFim(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Hora Início</label>
                      <input
                        type="time"
                        className="form-control"
                        placeholder="Hora Início"
                        value={horaInicio}
                        onChange={(e) => setHoraInicio(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Hora Fim</label>
                      <input
                        type="time"
                        className="form-control"
                        placeholder="Hora Fim"
                        value={horaFim}
                        onChange={(e) => setHoraFim(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
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

                    <div className="form-group">
                      <label>Foto</label>
                      <Camera
                        onTakePhoto={(dataUri) => {
                          handleTakePhoto(dataUri);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={validarCampos}
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={limparCampos}
                    >
                      Limpar
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={onClickListar}
                    >
                      Listar
                    </button>
                  </div>
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
