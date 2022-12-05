import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import useForm from "react-hook-form";
import { Form } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import { RadioGroup } from "@mui/material";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";

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

  //Deve emitir um alerta caso o usuário não esteja logado
  if (!localStorage.getItem("token")) {
    alert("Você não está logado!");
    return <Navigate to="/signin" />;
  }

  //Ao clicar em cadastrar, deve emitir um alerta caso os campos não estejam preenchidos
  const salvar = () => {
    if (
      descricao === "" ||
      dataInicio === "" ||
      dataFim === "" ||
      horaInicio === "" ||
      horaFim === "" ||
      nomeDaObra === "" ||
      categoriaObra === "" ||
      cep === "" ||
      bairro === "" ||
      estado === "" ||
      endereco === "" ||
      email === "" ||
      proprietario === "" ||
      telefone === "" ||
      complemento === "" ||
      cidade === "" ||
      valor === "" ||
      imagem === "" ||
      status === ""
    ) {
      alert("Preencha todos os campos!");
    } else {
      handleSubmit();
      alert("Cadastro realizado com sucesso!");
      navigate("/construcaoService");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Cadastro de Serviço</h4>
            </div>
            <div className="card-body">
              <form method="POST">
                <div className="row">
                  <div className="col-md-12">
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
                  <div className="col-md-6 pr-1">
                    <div className="form-group">
                      <label>Data de Início</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Data de Início"
                        value={dataInicio}
                        onChange={(e) => setDataInicio(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 pl-1">
                    <div className="form-group">
                      <label>Data de Término</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Data de Término"
                        value={dataFim}
                        onChange={(e) => setDataFim(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 pr-1">
                    <div className="form-group">
                      <label>Hora de Início</label>
                      <input
                        type="time"
                        className="form-control"
                        value={horaInicio}
                        onChange={(e) => setHoraInicio(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 pl-1">
                    <div className="form-group">
                      <label>Hora de Término</label>
                      <input
                        type="time"
                        className="form-control"
                        value={horaFim}
                        onChange={(e) => setHoraFim(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 pr-1">
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
                  <div className="col-md-6 pl-1">
                    <div className="form-group">
                      <label>Categoria da Obra</label>
                      <select
                        className="form-control"
                        value={categoriaObra}
                        onChange={(e) => setCategoriaObra(e.target.value)}
                      >
                        <option value="Residencial">Residencial</option>
                        <option value="Comercial">Comercial</option>
                        <option value="Industrial">Industrial</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 pr-1">
                    <div className="form-group">
                      <label>CEP</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="CEP"
                        value={cep}
                        onChange={(e) => {
                          setCep(e.target.value);
                          validarCep(e);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 pl-1">
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
                </div>
                <div className="row">
                  <div className="col-md-4 pr-1">
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
                  <div className="col-md-4 px-1">
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

                  <div className="col-md-4 pl-1">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 pl-1">
                    <div className="form-group">
                      <label>Telefone</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 pl-1">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        className="form-control"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="Andamento">Em andamento</option>
                        <option value="Finalizado">Finalizado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4 pl-1">
                    <div className="form-group">
                      <label>Valor</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Valor"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 pl-1">
                    <div className="form-group">
                      <label>Proprietario</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Proprietario"
                        value={proprietario}
                        onChange={(e) => setProprietario(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 pl-1">
                    <div className="form-group">
                      <label>Imagem</label>
                      <input
                        type="file"
                        className="form-control"
                        placeholder="Imagem"
                        value={imagem}
                        onChange={(e) => setImagem(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <br />
                <div className="row">
                  <div className="update ml-auto mr-auto">
                    <button
                      type="submit"
                      className="btn btn-primary btn-round"
                      onClick={handleSubmit}
                    >
                      Cadastrar
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
