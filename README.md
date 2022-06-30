# Projeto de estudo sobre o framework k6

Este projeto é um estudo sobre o framework de teste de carga [k6](https://k6.io). Para este estudo está sendo utilizada a api [REQ|RES](https://reqres.in/).

## ⚙️ Como instalar o k6
As formas de instalação do k6 podem ser encontradas na página oficial do framework clicando [aqui](https://k6.io/docs/getting-started/installation/).

## ▶️ Como executar este projeto
Após clonar o projeto para sua máquina execute os seguintes comandos:

```bash
npm install
```

```bash
k6 run index.js
```

## 🗂 Organização do projeto

```
├── data (Massa de dados)
├── tests
│   ├── options (Arquivos de configurações. Ex: Arquivo de variável de ambiente)
│   ├── routes (Rotas utilizadas nos testes)
│   ├── scenarios (Cenários de testes)
|   |   ├── auth
|   |   ├── user
```