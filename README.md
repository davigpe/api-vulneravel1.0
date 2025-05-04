# API-Vulnerável - Projeto de Estudo de Pentesting em Aplicações Node.js

Este projeto consiste em uma API RESTful deliberadamente vulnerável, desenvolvida com Node.js, Express e MongoDB. O objetivo é demonstrar na prática vulnerabilidades comuns como NoSQL Injection e boas práticas de segurança web através de testes de pentesting e correções.

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

1. Crie um arquivo `.env` na raiz do projeto com a seguinte variável:

```
PORT=3000
MONGODB_URI=mongodb+srv://admin:adminsenha@cluster0.ddytvld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

2. Inicie o servidor:

```bash
node app.js
```

O servidor rodará por padrão em `http://localhost:3000`.

---

## Exemplos de Requisições (Postman)

### Criar Usuário

- **POST** `http://localhost:3000/users`

```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "123456"
}
```

### Buscar Todos os Usuários

- **GET** `http://localhost:3000/users`

### Atualizar Usuário

- **PUT** `http://localhost:3000/users/<ID_DO_USUARIO>`

```json
{
  "username": "adminAtualizado"
}
```

### Deletar Usuário

- **DELETE** `http://localhost:3000/users/<ID_DO_USUARIO>`

### Ataque de NoSQL Injection

- **POST** `http://localhost:3000/users/find`

```json
{
  "username": { "$ne": null }
}
```

Esse payload retorna **todos os usuários**, mesmo sem credenciais válidas.

---

## Relatórios

### Sumário Executivo

Este projeto simula vulnerabilidades em aplicações web baseadas em Node.js com foco em segurança ofensiva e defensiva. Ele demonstra na prática como entradas maliciosas podem comprometer a integridade do banco de dados e ensina como mitigar riscos usando técnicas de validação e parametrização. É uma ferramenta educativa voltada para estudantes e profissionais de tecnologia que buscam compreender os riscos reais do desenvolvimento inseguro.

---

### Relatório Técnico

**Vulnerabilidade Demonstrada:** NoSQL Injection  
**Comportamento:**  
Ao enviar um payload como `{"username": {"$ne": null}}` em uma consulta ao banco (sem validação), é possível contornar autenticações e acessar dados de outros usuários.

**Consequências:**

- Vazamento de dados sensíveis
- Escalada de privilégios
- Comprometimento da aplicação

**Correções Recomendadas:**

- Uso de validação de tipos (ex: `typeof username === 'string'`)
- Escape de caracteres especiais e uso de bibliotecas como `express-validator` ou `joi`
- Uso de filtros específicos (ex: `User.findOne({ username: String(username) })`)

**Permissões no Banco:**  
Reduza privilégios do usuário da aplicação para leitura e escrita apenas nas coleções necessárias, evitando comandos administrativos.

---

## Autores

- Andressa Lopes
- Davi Pereira
- Gustavo Marcelino
- Rebeca Lara
- Stefani Santana
