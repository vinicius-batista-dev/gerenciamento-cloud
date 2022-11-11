import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, redirect, useNavigation } from "react-router-dom";
import axios from "axios";

const listUser = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const listarUsuarios = async () => {
    try {
      const response = await axios.get(
        "https://api-cloud-gerencia.herokuapp.com/api/usuario",
        config
      );
      setUsername(response.data.username);
      setEmail(response.data.email);
      setPassword(response.data.password);
    } catch (error) {
      console.log(error);
    }
  };

  //Create a function to define user if is admin
  const isAdmin = () => {
    if (localStorage.getItem("role") === "admin") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Lista de Usuários</h1>
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Senha</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {listarUsuarios.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <Link
                    className="btn btn-primary mr-2"
                    to={`/users/edit/${user.id}`}
                  >
                    Editar
                  </Link>
                </td>
                <td>
                  <Link
                    className="btn btn-danger"
                    to={`/users/delete/${user.id}`}
                  >
                    Excluir
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default listUser;
