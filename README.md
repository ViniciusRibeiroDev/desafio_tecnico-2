# Backend - Desafio Técnico 2

Objetivo:
Desenvolver uma API RESTful para autenticação de usuários, que permita operações de cadastro (sign up), autenticação (sign in) e recuperação de informações do usuário.

## Como usar

### Como rodar a API

É necessário instalar as dependências do projeto para poder utilizar. Para isso rode o seguinte comando:

```bash
npm install
```

Logo após é nessessario rodar as migrações, depois de configurar o arquivo .env (necessário para a conexão do o banco de dados), execute o seguinte comando:

```bash
npm run typeorm migration:run -- -d ./src/data-source
```

E para usar rode o comando:

```bash
npm run dev
```

## End Points

### POST `/users` - Criação de usuários

Exemplo de corpo de requisição:

```json
{
  "nome": "Nome Exemplo",
  "email": "exemplo@mail.com",
  "senha": "123456",
  "telefone": [
    {
      "numero": "988466795",
      "ddd": "22"
    }
  ]
}
```

Restorno:

#### status 201

```json
{
  "id": 1,
  "data_criacao": "2023-11-25",
  "data_atualizacao": "2023-11-25",
  "ultimo_login": "2023-11-26",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE3MDA5NjU1NDcsImV4cCI6MTcwMDk2NzM0Nywic3ViIjoiMSJ9.I5vAxIGy3dRH7G5JVmSwnRyjot4lHwpjCYX_5OhRRGw"
}
```

OBS: Em casos de já ouver um usuário com o mesmo email cadastrado, o cadastro não irá funcionar.

### GET `/users` - Recuperar dados do usuário (Necessário de token de authenticação)

Não necessita de corpo de requisição.

Retorno:

#### status 200

```json
{
  "id": 1,
  "data_criacao": "2023-11-25",
  "data_atualizacao": "2023-11-25",
  "ultimo_login": "2023-11-26",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE3MDA5NjU1NDcsImV4cCI6MTcwMDk2NzM0Nywic3ViIjoiMSJ9.I5vAxIGy3dRH7G5JVmSwnRyjot4lHwpjCYX_5OhRRGw",
  "nome": "Nome Exemplo",
  "email": "exemplo@mail.com",
  "telefone": [
    {
      "id": 1,
      "numero": "988469127",
      "ddd": "22"
    }
  ]
}
```

### POST `/users/login` - Login

Exemplo de corpo de requisição:

```json
{
  "email": "exemplo@mail.com",
  "senha": "123456"
}
```

retorno:

#### status 200

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE3MDA5NjYxMjAsImV4cCI6MTcwMDk2NzkyMCwic3ViIjoiMSJ9.ZWlZ1daED4Uydfinqou7uXf7mxMhcdmJswslobrvEZo"
}
```
