# Sobre o Projeto 

O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

  Fiquei responsável por desenvolver uma API e também integrar *- através do docker-compose -* as aplicações para que elas funcionem consumindo um banco de dados.

  Nesse projeto, foi construido **um back-end dockerizado utilizando modelagem de dados através do Sequelize**.  **sua API é capaz de ser consumida por um front-end já provido nesse projeto**.

  Para adicionar uma partida é necessário ter um _token_, portanto a pessoa deverá estar logada para fazer as alterações. Tendo um relacionamento entre as tabelas `teams` e `matches` para fazer as atualizações das partidas.

  O seu back-end implementou as regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

# Tecnologias e ferramentas usadas 🛠

![TypeScript](https://img.shields.io/badge/-TypeScript-235a97?style=flat-square&logo=typescript&logoColor=ffffff)
![Mocha](https://img.shields.io/badge/-Mocha-896446?style=flat-square&logo=mocha&logoColor=ffffff)
![Chai](https://img.shields.io/badge/-Chai-a40802?style=flat-square&logo=chai)
![Sinon](https://img.shields.io/badge/-Sinon-a0d3a4?style=flat-square&logo=sinon)
![Docker](https://img.shields.io/badge/-Docker-003f8c?style=flat-square&logo=docker&logoColor=fff)
![Express](https://img.shields.io/badge/-Express-339999?style=flat-square&logo=express)
![MySQL](https://img.shields.io/badge/-MySQL-EAA221?style=flat-square&logo=mysql&logoColor=1e4c68)
![Sequelize](https://img.shields.io/badge/-Sequelize-02afef?style=flat-square&logo=sequelize&logoColor=ffffff)
![JWToken](https://img.shields.io/badge/-JWToken-000?style=flat-square&logo=jsonwebtokens&logoColor=d63aff)

# Desafios

- Criar, popular e relacionar as tabelas utilizando a ORM Sequelize;

- Criação do back-end utilizando TypeScript;

- Relembrar os conceitos de Docker para utilização do docker-compose, integrando as duas aplicações;

- Criação de testes unitários para a aplicação do back-end;

- Para o futuro, trazer um front-end novo;


# Iniciando o Projeto Trybe Futebol Club.

Importante: seguir a ordem apresentada a baixo, para o funcionamento.

<details>
  <summary>
    <strong>
      ⚠️ Configurações mínimas para execução do projeto
    </strong>
  </summary>

   - Sistema Operacional Distribuição Unix
 - Node versão 16
 - Docker
 - Docker-compose versão >=1.29.2
 - node versão 16.15.0 LTS ou superior

</details>

<details>
  <summary>
    <strong>
      ⚙️ Variáveis de ambiente
    </strong>
  </summary>

Deve-se criar um arquivo .env na raiz da pasta backend com o seguinte conteúdo:
```
JWT_SECRET=jwt_secret
APP_PORT=3001
DB_USER=root
DB_PASS=123456
DB_HOST=localhost 
DB_PORT=3002
```
</details>

<details>
  <summary>
    <strong>
      ⚠️ Inicie o docker-compose
    </strong>
  </summary>

Para iniciar o docker compose, foi configurado pela trybe um script bem simples, basta digitar em seu terminal localizado na primeira pasta do projeto, `npm run compose:up`, ele irá iniciar os containers necessários para ter acesso ao frontend, que consome a API. Após concluir essa inicialização, basta acessar em seu navegador a url: `localhost:3000`.

</details>

<details>
  <summary>
    <strong>
      :family_man_woman_girl_boy: Usuários
    </strong>
  </summary>

Usuário administrador:
```
email: admin@admin.com
password: secret_admin
```
Usuário cliente:
```
email: user@user.com
password: secret_user
```

</details>

</details>
