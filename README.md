# Clean App Model - backend

<p align="center">
  <img align="center" src='https://img.shields.io/badge/status-developing-blue' />
  <img align="center" src='https://img.shields.io/badge/version-0.1-blue' />
  <img align="center" src='https://img.shields.io/badge/release%20date-jun/2023-blue' />
</p>

##

Clean App Model é um projeto incial usando **Arquitetura Limpa** com funcionalidades de **registro de usuário**, **login** e **recuperação de senha** baseado em Node.js, Typescript, Express, JWT, Bcrypt, Jest, Supertest, Prisma, Mysql, ESLint, Prettier, Husky, Commitizen e Lint-staged.

## Features

- :heavy_check_mark: Registro de usário
- :wrench: Login
- Recuperação de senha

## Requisitos

- Node.js
- npm
- Docker (opcional)

## Executando o projeto

Execute o seguinte comando em seu ambiente local:

```
git clone https://github.com/HitaloNasc/clean-app-model-backend.git
cd clean-app-model-backend
npm install
```

Em seguida, você deve subir o banco de dados (requer docker):

```
npm run db:dev:up
npm run db:dev:push
```

Finalmente, para executar localmente no modo desenvolvimento:

```
npm run start:dev
```

Por padrão o projeto rodará na porta 3333, mas isto pode ser alterado nas variáveis de ambiente para desenvolvimento em `/.env.development`.

## Comandos

Todos os comandos são executados a partir da raiz do projeto, a partir de um terminal:

| Command                     | Action                                                                                       |
|:----------------------------|:---------------------------------------------------------------------------------------------|
| `npm install`               | Instala as dependências do projeto                                                           |
| `npm run start:dev`         | Inicial o projeto localmente na porta `localhost:3333`                                       |
| `npm run db:dev:up`         | Instancia um container com um banco de dados mysql para consumo no modo desenvolvimento      |
| `npm run db:dev:down        | Para container com um banco de dados mysql no modo desenvolvimento                           |
| `npm run db:test:up`        | Instancia um container com um banco de dados mysql para consumo no modo teste                |
| `npm run db:test:down       | Para container com um banco de dados mysql no modo teste                                     |
| `npm run test`              | Executa todos os testes                                                                      |
| `npm run test:unit`         | Executa apenas os testes unitários                                                           |
| `npm run test:integration`  | Executa apenas os testes de integração                                                       |
| `npm run lint`              | Executa o ESLint e reporta os problemas no código                                            |
| `npm run format`            | Executa o Prettier formata os arquivos com problema de identação                             |
