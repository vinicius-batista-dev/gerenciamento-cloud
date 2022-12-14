import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

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
    status: status,
  };

  const api = "https://api.construcao.com/api/construcao";

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(api, data, config)
      .then((response) => {
        console.log(response);
        navigate("/construcao");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Ao digitar o cep, ele busca os dados do endere??o
  const handleCep = (e) => {
    setCep(e.target.value);
    axios
      .get(`https://viacep.com.br/ws/${e.target.value}/json/`)
      .then((response) => {
        setBairro(response.data.bairro);
        setEstado(response.data.uf);
        setEndereco(response.data.logradouro);
        setCidade(response.data.localidade);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Deve emitir um alerta caso o usu??rio n??o esteja logado
  if (!localStorage.getItem("token")) {
    alert("Voc?? n??o est?? logado!");
    return <Navigate to="/signin" />;
  }

  //Deve emitir um alerta caso os campos n??o estejam preenchidos
  const validarCampos = () => {
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
      status === ""
    ) {
      alert("Preencha todos os campos!");
      return false;
    }
    return true;
  };

  const listarEstados = (e) => {
    e.preventDefault();
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!localStorage.getItem("token")) {
    alert("Voc?? n??o est?? logado!");
    return <Navigate to="/signin" />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Cadastro de Servi??o</h4>
            </div>
            <div className="card-body">
              <form method="POST">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Descri????o</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Descri????o"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 pr-1">
                    <div className="form-group">
                      <label>Data de In??cio</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Data de In??cio"
                        value={dataInicio}
                        onChange={(e) => setDataInicio(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 pl-1">
                    <div className="form-group">
                      <label>Data de T??rmino</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Data de T??rmino"
                        value={dataFim}
                        onChange={(e) => setDataFim(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 pr-1">
                    <div className="form-group">
                      <label>Hora de In??cio</label>
                      <input
                        type="time"
                        className="form-control"
                        placeholder="Hora de In??cio"
                        value={horaInicio}
                        onChange={(e) => setHoraInicio(e.target.value)}
                      />
                      <small className="form-text text-muted">
                        Exemplo: 08:00
                      </small>
                      <br />
                    </div>
                  </div>
                  <div className="col-md-6 pl-1">
                    <div className="form-group">
                      <label>Hora de T??rmino</label>
                      <input
                        type="time"
                        className="form-control"
                        placeholder="Hora de T??rmino"
                        value={horaFim}
                        onChange={(e) => setHoraFim(e.target.value)}
                      />
                      <small className="form-text text-muted">
                        Exemplo: 18:00
                      </small>
                      <br />
                    </div>
                  </div>
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
                        <option value="0">Selecione</option>
                        <option value="Residencial">Residencial</option>
                        <option value="Comercial">Comercial</option>
                        <option value="Industrial">Industrial</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 pr-1">
                    <div className="form-group">
                      <label>CEP</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="CEP"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
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
                  <div className="col-md-6 pr-1">
                    <div className="form-group">
                      <label>Estado</label>
                      <select
                        className="form-control"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                      >
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amap??</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Cear??</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Esp??rito Santo</option>
                        <option value="GO">Goi??s</option>
                        <option value="MA">Maranh??o</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Par??</option>
                        <option value="PB">Para??ba</option>
                        <option value="PR">Paran??</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piau??</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rond??nia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">S??o Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 pl-1">
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
                  <div className="col-md-6 pr-1">
                    <div className="form-group">
                      <label>Endere??o</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Endere??o"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                      />
                      <small className="form-text text-muted">
                        Exemplo: Rua das Flores, 123
                      </small>
                    </div>
                  </div>
                  <div className="col-md-6 pl-1">
                    <div className="form-group">
                      <label>Complemento</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Complemento"
                        value={complemento}
                        onChange={(e) => setComplemento(e.target.value)}
                      />
                      <small className="form-text text-muted">
                        Exemplo: Casa 1
                      </small>
                    </div>
                  </div>
                  <div className="col-md-6 pr-1">
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
                  <div className="col-md-6 pl-1">
                    <div className="form-group">
                      <label>Telefone</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                      />
                      <small className="form-text text-muted">
                        Exemplo: (11) 99999-9999
                      </small>
                    </div>
                  </div>
                  <div className="col-md-6 pr-1">
                    <div className="form-group">
                      <label>Nome do Respons??vel</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nome do Respons??vel"
                        value={proprietario}
                        onChange={(e) => setProprietario(e.target.value)}
                      />
                      <small className="form-text text-muted">
                        Exemplo: Jo??o da Silva
                      </small>
                    </div>
                  </div>
                  <div className="col-md-6 pl-1">
                    <div className="form-group">
                      <label>Valor da Obra</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Valor da Obra"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                      />
                      <small className="form-text text-muted">
                        Exemplo: 1000,00
                      </small>
                    </div>
                  </div>
                  <div className="col-md-6 pr-1">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        className="form-control"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="Em Andamento">Em Andamento</option>
                        <option value="Finalizado">Finalizado</option>
                        <option value="Cancelado">Cancelado</option>
                        <option value="Aguardando">Aguardando</option>
                      </select>
                      <small className="form-text text-muted">
                        Exemplo: Em Andamento
                      </small>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="btn btn-primary btn-block"
                >
                  Cadastrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstrucaoService;
