## PROJETO DE GESTAO DE OBRAS

# Objetivo

O objetivo deste projeto é criar um sistema de gestão de obras, que permita o cadastro de obras, funcionários, materiais e equipamentos, e que permita a geração de relatórios de custos e de prazos.

## Camadas de projeto do frontend

    * Camada de componentes: responsável por renderizar os componentes da aplicação.
    * Camada de serviços: responsável por fazer as requisições HTTP para a API.
    * Camada de rotas: responsável por gerenciar as rotas da aplicação.
    * Camada de pages: responsável por renderizar as páginas da aplicação.
    * Camada de contexts (opcional): responsável por gerenciar o estado da aplicação.

# Requisitos

## Requisitos funcionais

    * O sistema deve permitir o cadastro de obras, com os seguintes dados: nome, endereço, valor total, prazo de execução, data de início, data de término, e o nome do responsável pela obra.
    * O sistema deve permitir o cadastro de funcionários, com os seguintes dados: nome, endereço, telefone, e salário.
    * O sistema deve permitir o cadastro de materiais, com os seguintes dados: nome, preço, e quantidade.
    * O sistema deve permitir o cadastro de equipamentos, com os seguintes dados: nome, preço, e quantidade.
    * O sistema deve permitir a associação de materiais e equipamentos a obras.
    * O sistema deve permitir a associação de funcionários a obras.
    * O sistema deve permitir a geração de relatórios de custos de obras, com os seguintes dados: nome da obra, valor total, valor dos materiais, valor dos equipamentos, valor dos funcionários, e valor dos serviços terceirizados.
    * O sistema deve permitir a geração de relatórios de prazos de obras, com os seguintes dados: nome da obra, prazo de execução, data de início, data de término, e prazo restante.

## Requisitos não funcionais

    * O sistema deve ser desenvolvido em Nodejs.
    * O sistema deve ser desenvolvido utilizando o framework Express.
    * O sistema deve ser desenvolvido utilizando o framework Sequelize.
    * O sistema deve ser desenvolvido utilizando a biblioteca Reactjs.
    * O sistema deve ser desenvolvido utilizando o framework Material-UI.
    * O sistema deve ser desenvolvido utilizando o framework Bootstrap.
    * O sistema deve ser desenvolvido utilizando o framework Reactstrap.

## Domínio do problema e contexto de sua aplicação

O sistema de gestão de obras é um sistema que permite o cadastro de obras, funcionários, materiais e equipamentos, e que permite a geração de relatórios de custos e de prazos.

## Descrição dos interessados do sistema e suas necessidades

O sistema de gestão de obras é utilizado por empresas de construção civil, que precisam gerenciar obras, funcionários, materiais, e que precisam gerar relatórios de custos e de prazos.

## Descrição dos dados do sistema

O sistema de gestão de obras armazena os seguintes dados:

    * Obras: nome, endereço, valor total, prazo de execução, data de início, data de término, e o nome do responsável pela obra.
    * Funcionários: nome, endereço, telefone, e salário.
    * Materiais: nome, preço, e quantidade.

## Casos de Uso e Requisitos Funcionais

### Caso de Uso 1: Cadastrar Obra

    * O sistema deve permitir o cadastro de obras, com os seguintes dados: nome, endereço, valor total, prazo de execução, data de início, data de término, e o nome do responsável pela obra.

### Caso de Uso 2: Cadastrar Funcionário

    * O sistema deve permitir o cadastro de funcionários, com os seguintes dados: nome, endereço, telefone, e salário.

### Caso de Uso 3: Cadastrar Material

    * O sistema deve permitir o cadastro de materiais, com os seguintes dados: nome, preço, e quantidade.

### Requisitos de informação

    * O sistema deve permitir a associação de materiais e equipamentos a obras.
    * O sistema deve permitir a associação de funcionários a obras.
    * O sistema deve permitir a geração de relatórios de custos de obras, com os seguintes dados: nome da obra, valor total, valor dos materiais, valor dos equipamentos, valor dos funcionários, e valor dos serviços terceirizados.
    * O sistema deve permitir a geração de relatórios de prazos de obras, com os seguintes dados: nome da obra, prazo de execução, data de início, data de término, e prazo restante.

## Clone o projeto e instale as dependências

```bash

git clone

cd

npm install

```

## Inicie o servidor de desenvolvimento

```bash

npm start

```

## Para contribuir

1. Faça o _fork_ do projeto (<

2. Crie uma _branch_ para sua modificação (`git checkout -b feature/seu-nome`)

3. Faça o _commit_ (`git commit -am 'Minha nova feature'`)

4. _Push_ (`git push origin feature/bug`)

5. Crie um novo _Pull Request_

## Licença

Este projeto está licenciado sob a licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter detalhes.
