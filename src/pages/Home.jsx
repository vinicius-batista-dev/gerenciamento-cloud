import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, redirect, useNavigation } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            
            <div className="card-body">
              <h5 className="card-title">
                Bem vindo ao sistema de gerenciamento de construção!
              </h5>
              <p className="card-text">
                Para utilizar o sistema, acesse o menu superior.
              </p>
              <p>
                O objetivo deste sistema consiste em ajudar as empresas de
                construcao civil, a gerenciar seus projetos de construcao,
                fornecendo um sistema de cadastro de construcao, cadastro de
                servicos, cadastro de funcionarios, cadastro de materiais,
                cadastro de fornecedores, cadastro de clientes, cadastro de
                orcamentos, cadastro de compras, cadastro de vendas, cadastro de
                pagamentos, cadastro de recebimentos, cadastro de despesas,
                cadastro de receitas, cadastro de contas a pagar, cadastro de
                contas a receber, cadastro de relatorios, cadastro de usuarios,
              </p>
              <Link to="/signin" className="btn btn-primary">
                Acessar o sistema
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
