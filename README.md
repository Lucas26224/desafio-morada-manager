# 🏛️ Morada Manager - Gestão de Capelas

Mini projeto Full Stack desenvolvido como parte do teste prático para a vaga de Desenvolvedor Jr. no Grupo Morada.

## 🎯 Objetivo da Solução
O sistema visa resolver um problema comum de logística interna: o **conflito / desorganização no agendamento de salas de velório**.
A solução oferece um **Painel de Controle em Tempo Real** que permite:
* Visualizar quais capelas estão Livres, Ocupadas ou Aguardando Limpeza.
* Agendar velórios com detalhes (responsável, tipo de urna, horários).
* Atualizar o status da sala rapidamente no próprio quadro informativo (ex: liberar para limpeza - livre - ocupada).
* Evitar choque de horários através de uma lista unificada de salas.

## 🚀 Tecnologias Utilizadas
* **Back-end:** Node.js, Express.
* **Front-end:** React.js, Axios.
* **Banco de Dados:** SQLite (com Query Builder Knex).
* **Arquitetura:** MVC (Model-View-Controller) com separação de responsabilidades.

## ⚙️ Como executar o projeto

### Pré-requisitos
Tenha o [Node.js](https://nodejs.org/) instalado em sua máquina.

### Passo 1: Rodar a API (Back-end)
1. Acesse a pasta da api: `cd api`
2. Instale as dependências: `npm install`
3. Inicie o servidor: `node src/index.js`
   * O servidor rodará na porta **3333**.
   * O banco de dados `db.sqlite` será criado automaticamente.

### Passo 2: Rodar a Interface (Front-end)
1. Em um novo terminal, acesse a pasta web: `cd web`
2. Instale as dependências: `npm install`
3. Inicie o projeto: `npm start`
   * O navegador abrirá automaticamente em `http://localhost:3000`.

## ✨ Funcionalidades (CRUD)
Tentei ao máximo trabalhar com a página intuitiva, segue então as informações:
* **CREATE:** Agendamento de novos velórios com validação de campos.
* **READ:** Listagem de todas as salas e seus status atuais.
* **UPDATE:** Alteração rápida de status (Ocupada -> Limpeza -> Livre) direto no card.
* **DELETE:** Liberação total da sala (exclusão do agendamento) ao finalizar o serviço.

---
Desenvolvido por Lucas Lisboa