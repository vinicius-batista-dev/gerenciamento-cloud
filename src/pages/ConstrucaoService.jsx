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

  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const data = {
    descricao: descricao,
    dataInicio: dataInicio,
    dataFim: dataFim,
    horaInicio: horaInicio,
    horaFim: horaFim,
    nomeDaObra: nomeDaObra,
    categoriaObra: categoriaObra,
    cep: cep,
    bairro: bairro,
    estado: estado,
    endereco: endereco,
    email: email,
    proprietario: proprietario,
    telefone: telefone,
    complemento: complemento,
    cidade: cidade,
    valor: valor,
    imagem: imagem,
    status: status,
  };

  const api = "https://api-cloud-gerencia.herokuapp.com/api/construcao";

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://api-cloud-gerencia.herokuapp.com/api/construcao",
        data,
        config
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validarCep = async (e) => {
    const cep = e.target.value;
    if (cep.length === 8) {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setEndereco(response.data.logradouro);
      setBairro(response.data.bairro);
      setCidade(response.data.localidade);
      setEstado(response.data.uf);
    }
  };

  const converterImagem = (dataUri) => {
    setImagem(dataUri);
  };

  //Deve ser criado um componente para a camera
  const camera = () => {
    return (
      <Camera
        onTakePhoto={(dataUri) => {
          converterImagem(dataUri);
        }}
      />
    );
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
              <form method="POST" onSubmit={handleSubmit}>
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
                  <div className="col-12">
                    <div className="form-group">
                      <label>Data Inicio</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Data Inicio"
                        value={dataInicio}
                        onChange={(e) => setDataInicio(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
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
                  <div className="col-12">
                    <div className="form-group">
                      <label>Hora Inicio</label>
                      <input
                        type="time"
                        className="form-control"
                        placeholder="Hora Inicio"
                        value={horaInicio}
                        onChange={(e) => setHoraInicio(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
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
                  <div className="col-12">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        type="text"
                        className="form-control"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="0">Selecione</option>
                        <option value="Andamento">Em Andamento</option>
                        <option value="Finalizado">Finalizado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Nome da Obra</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nome da Obra"
                        value={nomeDaObra}
                        onChange={(e) => setNomeDaObra(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Categoria da Obra</label>
                      <select
                        type="text"
                        className="form-control"
                        value={categoriaObra}
                        onChange={(e) => setCategoriaObra(e.target.value)}
                      >
                        <option value="0">Selecione</option>
                        <option value="construcao">Construção</option>
                        <option value="reforma">Reforma</option>
                        <option value="manutencao">Manutenção</option>
                        <option value="demolicao">Demolição</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>CEP</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="CEP"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        onBlur={validarCep}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Endereço</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Endereço"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Bairro</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Bairro"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Cidade</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Estado</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Estado"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Complemento</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Complemento"
                        value={complemento}
                        onChange={(e) => setComplemento(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Complemento"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Telefone</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Telefone para contato"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Proprietario</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Proprietário"
                        value={proprietario}
                        onChange={(e) => setProprietario(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group">
                      <label>Valor</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Valor"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Imagem</label>
                      <input
                        type="file"
                        className="form-control"
                        placeholder="Imagem"
                        onChange={(e) => setImagem(e.target.files[0])}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <button
                      style={{ marginTop: "20px" }}
                      type="submit"
                      className="btn btn-primary"
                    >
                      Salvar
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
