import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, redirect, useNavigation } from "react-router-dom";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { Search } from "react-router-dom";

const ConsultaConstrucao = () => {
  const [construcaoId, setConstrucaoId] = React.useState("");
  const [construcaoDescricao, setConstrucaoDescricao] = React.useState("");
  const [construcaoDataInicio, setConstrucaoDataInicio] = React.useState("");
  const [construcaoDataFim, setConstrucaoDataFim] = React.useState("");
  const [construcaoHoraInicio, setConstrucaoHoraInicio] = React.useState("");
  const [construcaoHoraFim, setConstrucaoHoraFim] = React.useState("");

  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };


  if (!localStorage.getItem("token")) {
    navigate("/");
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://api-cloud-gerencia.herokuapp.com/api/construcao/" +
          construcaoId,
        config
      );
      setConstrucaoId(response.data.id);
      setConstrucaoDescricao(response.data.descricao);
      setConstrucaoDataInicio(response.data.dataInicio);
      setConstrucaoDataFim(response.data.dataFim);
      setConstrucaoHoraInicio(response.data.horaInicio);
      setConstrucaoHoraFim(response.data.horaFim);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        "https://api-cloud-gerencia.herokuapp.com/api/construcao/" +
          construcaoId,
        config
      );
      navigate("/listarConstrucao");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Consulta de Construção</h1>
        <form onSubmit={handleSearch}>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="construcaoId">ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="construcaoId"
                  value={construcaoId}
                  onChange={(e) => setConstrucaoId(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4" style={{ marginTop: 23 }}>
              <button className="btn btn-primary" type="submit">
                Pesquisar
              </button>
            </div>
          </div>
        </form>
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Descrição</th>
              <th scope="col">Data Início</th>
              <th scope="col">Data Fim</th>
              <th scope="col">Hora Início</th>
              <th scope="col">Hora Fim</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{construcaoId}</th>
              <td>{construcaoDescricao}</td>
              <td>{construcaoDataInicio}</td>
              <td>{construcaoDataFim}</td>
              <td>{construcaoHoraInicio}</td>
              <td>{construcaoHoraFim}</td>
            </tr>
          </tbody>
        </table>
        <div className="col-md-4" style={{ marginTop: 23 }}>
          <button
            className="btn btn-danger"
            type="submit"
            onClick={handleDelete}
          >
            Excluir
          </button>

          <Link
            style={{ marginLeft: "10px" }}
            className="btn btn-primary"
            to="/listarConstrucao"
          >
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConsultaConstrucao;
