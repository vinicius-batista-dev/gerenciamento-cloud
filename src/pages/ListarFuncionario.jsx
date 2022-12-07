import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Modal, Button, Form, CardImg } from "react-bootstrap";
import { ButtonBase, Select } from "@mui/material";
import { Delete, Edit } from "@material-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListarFuncionario = () => {
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [cargo, setCargo] = React.useState("");
  const [salario, setSalario] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [dataNascimento, setDataNascimento] = React.useState("");
  const [dataAdmissao, setDataAdmissao] = React.useState("");
  const [dataDemissao, setDataDemissao] = React.useState("");
  const [status, setStatus] = React.useState("");

  const [funcionarios, setFuncionarios] = React.useState([]);

  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const handleListar = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://api-cloud-gerencia.herokuapp.com/api/funcionario",
        config
      );
      setFuncionarios(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
};

export default ListarFuncionario;
