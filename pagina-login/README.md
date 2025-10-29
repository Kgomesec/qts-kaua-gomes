# API RESTful com Node.js, Express e SQLite

Este projeto implementa uma API RESTful para CRUD de usuários usando Node.js, Express e SQLite.

## Instalação

```powershell
cd pagina-login
npm install
```

## Uso

### Iniciar em modo desenvolvimento (com nodemon)
```powershell
npm run dev
```

### Iniciar normalmente
```powershell
npm start
```

A API estará disponível em http://localhost:3000

## Endpoints

- `GET    /users`         - Lista todos os usuários
- `GET    /users/:id`     - Busca usuário por ID
- `POST   /users`         - Cria novo usuário
- `PUT    /users/:id`     - Atualiza usuário existente
- `DELETE /users/:id`     - Remove usuário

## Estrutura dos dados

```json
{
  "id": 1,
  "name": "Nome do Usuário",
  "email": "email@exemplo.com"
}
```

## Banco de dados
O banco SQLite será criado automaticamente como `database.sqlite` na raiz da pasta `pagina-login`.
