# 📖 Documentação da API — Portal Lux

Esta documentação detalha todas as rotas disponíveis na API do **Portal Lux**, dividida entre os módulos de **Autenticação**, **Artigos** e **Comentários**.

---

# 📑 Índice

* [Configurações Globais](#configurações-globais)
* [Módulo de Autenticação e Perfis](#módulo-de-autenticação-e-perfis-apiauth)
* [Módulo de Artigos](#módulo-de-artigos-apiposts)
* [Módulo de Comentários](#módulo-de-comentários-apicomments)

---

# ⚙️ Configurações Globais

## URL Base

```http
http://localhost:3000/api
```

> Ou a porta definida na variável `PORT` do arquivo `.env`.

---

## Headers Padrão

Todas as requisições que enviam dados no corpo devem conter:

```http
Content-Type: application/json
```

---

## Autenticação

As rotas protegidas exigem o envio de um token JWT através do cabeçalho:

```http
Authorization: Bearer <SEU_TOKEN_JWT>
```

---

## Rate Limit

As rotas de **login** e **cadastro** possuem proteção contra ataques de força bruta:

* Máximo de 5 tentativas consecutivas;
* Janela de 15 minutos;
* O IP é temporariamente bloqueado após exceder o limite.

---

# 🔐 Módulo de Autenticação e Perfis (/api/auth)

## 1. Criar Nova Conta

### Endpoint

```http
POST /api/auth/register
```

### Autenticação

Pública

### Body

```json
{
  "name": "Nuno Silva",
  "username": "nuno_dev",
  "email": "nuno@portallux.com",
  "password": "Password123!"
}
```

### Respostas

#### 201 Created

```json
{
  "message": "Usuário criado com sucesso",
  "user": {
    "id": "7ac2e19a-9e12-4217-bcbb-7e0b5711680d",
    "name": "Nuno Silva",
    "username": "nuno_dev",
    "email": "nuno@portallux.com",
    "createdAt": "2026-05-30T10:00:00.000Z"
  }
}
```

#### 400 Bad Request

Dados inválidos segundo as validações da API.

#### 409 Conflict

E-mail ou username já cadastrados.

---

## 2. Autenticar Usuário (Login)

### Endpoint

```http
POST /api/auth/login
```

### Autenticação

Pública

### Body

```json
{
  "email": "nuno@portallux.com",
  "password": "Password123!"
}
```

### Respostas

#### 200 OK

```json
{
  "user": {
    "id": "7ac2e19a-9e12-4217-bcbb-7e0b5711680d",
    "name": "Nuno Silva",
    "username": "nuno_dev",
    "email": "nuno@portallux.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 401 Unauthorized

```json
{
  "message": "E-mail ou senha incorretos"
}
```

---

## 3. Verificar Disponibilidade de Username

### Endpoint

```http
GET /api/auth/check-username?username=nome_pretendido
```

### Autenticação

Pública

### Resposta

#### 200 OK

```json
{
  "available": true
}
```

---

## 4. Obter Perfil do Usuário Logado

### Endpoint

```http
GET /api/auth/me
```

### Autenticação

JWT obrigatório

### Resposta

#### 200 OK

```json
{
  "user": {
    "id": "7ac2e19a-9e12-4217-bcbb-7e0b5711680d",
    "name": "Nuno Silva",
    "username": "nuno_dev",
    "email": "nuno@portallux.com",
    "createdAt": "2026-05-30T10:00:00.000Z"
  }
}
```

---

## 5. Buscar Perfil Público de um Autor

### Endpoint

```http
GET /api/auth/users/:id
```

### Autenticação

Pública

### Resposta

#### 200 OK

```json
{
  "id": "7ac2e19a-9e12-4217-bcbb-7e0b5711680d",
  "name": "Nuno Silva",
  "username": "nuno_dev",
  "posts": [
    {
      "id": "b182d334-921a-4f11-9a72-680cb11f2211",
      "title": "Arquitetura limpa com TypeScript",
      "slug": "arquitetura-limpa-com-typescript",
      "content": "Conteúdo do artigo...",
      "status": "PUBLISHED",
      "createdAt": "2026-05-30T10:00:00.000Z",
      "updatedAt": "2026-05-30T10:00:00.000Z",
      "deletedAt": null,
      "authorId": "7ac2e19a-9e12-4217-bcbb-7e0b5711680d"
    }
  ]
}
```

#### 404 Not Found

```json
{
  "message": "Autor não encontrado"
}
```

---

# 📰 Módulo de Artigos (/api/posts)

## 1. Listagem Pública de Artigos

### Endpoint

```http
GET /api/posts?page=1&perPage=6
```

### Autenticação

Opcional

### Resposta

#### 200 OK

```json
{
  "meta": {
    "totalItems": 25,
    "itemCount": 1,
    "itemsPerPage": 6,
    "totalPages": 5,
    "currentPage": 1
  },
  "posts": [
    {
      "id": "b182d334-921a-4f11-9a72-680cb11f2211",
      "title": "Arquitetura limpa com TypeScript",
      "slug": "arquitetura-limpa-com-typescript",
      "content": "Conteúdo...",
      "status": "PUBLISHED",
      "createdAt": "2026-05-30T10:00:00.000Z",
      "updatedAt": "2026-05-30T10:00:00.000Z",
      "deletedAt": null,
      "authorId": "7ac2e19a-9e12-4217-bcbb-7e0b5711680d",
      "author": {
        "id": "7ac2e19a-9e12-4217-bcbb-7e0b5711680d",
        "name": "Nuno Silva",
        "username": "nuno_dev"
      },
      "likesCount": 14,
      "likedByMe": true
    }
  ]
}
```

---

## 2. Listagem de Artigos do Usuário Logado

### Endpoint

```http
GET /api/posts/me
```

### Autenticação

JWT obrigatório

### Resposta

```json
{
  "posts": [
    {
      "id": "b182d334-921a-4f11-9a72-680cb11f2211",
      "title": "Minha postagem incompleta",
      "slug": "minha-postagem-incompleta",
      "content": "Ainda rascunhando...",
      "status": "DRAFT",
      "createdAt": "2026-05-30T10:00:00.000Z",
      "likesCount": 0
    }
  ]
}
```

---

## 3. Buscar Artigo por Autor e Slug

### Endpoint

```http
GET /api/posts/author/:username/:slug
```

### Autenticação

Opcional

### Resposta

```json
{
  "id": "b182d334-921a-4f11-9a72-680cb11f2211",
  "title": "Arquitetura limpa com TypeScript",
  "slug": "arquitetura-limpa-com-typescript",
  "content": "Conteúdo completo aqui...",
  "status": "PUBLISHED",
  "createdAt": "2026-05-30T10:00:00.000Z",
  "author": {
    "id": "7ac2e19a-9e12-4217-bcbb-7e0b5711680d",
    "name": "Nuno Silva",
    "username": "nuno_dev"
  },
  "likesCount": 42,
  "likedByMe": false
}
```

---

## 4. Criar Novo Artigo

### Endpoint

```http
POST /api/posts
```

### Autenticação

JWT obrigatório

### Body

```json
{
  "title": "Dominando Next.js v15",
  "content": "Conteúdo extenso contendo mais de dez caracteres obrigatórios.",
  "status": "PUBLISHED"
}
```

### Resposta

#### 201 Created

```json
{
  "message": "Post criado com sucesso!",
  "post": {
    "id": "fa2190bb-91aa-42b4-9311-c80bb22f8164",
    "title": "Dominando Next.js v15",
    "slug": "dominando-nextjs-v15",
    "content": "Conteúdo extenso...",
    "status": "PUBLISHED",
    "authorId": "7ac2e19a-9e12-4217-bcbb-7e0b5711680d"
  }
}
```

---

## 5. Atualizar Artigo

### Endpoint

```http
PUT /api/posts/:id
```

### Autenticação

JWT obrigatório

### Body

```json
{
  "title": "Novo Título Atualizado"
}
```

### Respostas

#### 200 OK

Retorna o post atualizado.

#### 403 Forbidden

```json
{
  "message": "Você não possui permissão para editar este artigo"
}
```

---

## 6. Remover Artigo (Soft Delete)

### Endpoint

```http
DELETE /api/posts/:id
```

### Autenticação

JWT obrigatório

### Resposta

```json
{
  "message": "Artigo removido com sucesso!"
}
```

---

## 7. Curtir ou Descurtir Artigo

### Endpoint

```http
POST /api/posts/:id/likes
```

### Autenticação

JWT obrigatório

### Resposta

```json
{
  "liked": true,
  "message": "Conteúdo curtido com sucesso"
}
```

---

# 💬 Módulo de Comentários

## 1. Criar Comentário

### Endpoint

```http
POST /api/posts/:id/comments
```

### Autenticação

JWT obrigatório

### Body

```json
{
  "content": "Excelente artigo, parabéns pelo conteúdo!"
}
```

### Resposta

#### 201 Created

```json
{
  "message": "Comentário enviado!",
  "comment": {
    "id": "90bb21fa-11aa-4c22-b555-c80ee99f2214",
    "content": "Excelente artigo, parabéns pelo conteúdo!",
    "createdAt": "2026-05-30T13:05:00.000Z",
    "authorId": "7ac2e19a-9e12-4217-bcbb-7e0b5711680d",
    "postId": "b182d334-921a-4f11-9a72-680cb11f2211",
    "author": {
      "id": "7ac2e19a-9e12-4217-bcbb-7e0b5711680d",
      "name": "Nuno Silva",
      "username": "nuno_dev"
    }
  }
}
```

---

## 2. Listar Comentários de um Artigo

### Endpoint

```http
GET /api/posts/:id/comments
```

### Autenticação

Pública

### Resposta

```json
{
  "comments": [
    {
      "id": "90bb21fa-11aa-4c22-b555-c80ee99f2214",
      "content": "Excelente artigo, parabéns pelo conteúdo!",
      "createdAt": "2026-05-30T13:05:00.000Z",
      "author": {
        "id": "7ac2e19a-9e12-4217-bcbb-7e0b5711680d",
        "name": "Nuno Silva",
        "username": "nuno_dev"
      }
    }
  ]
}
```

---

## 3. Remover Comentário Próprio

### Endpoint

```http
DELETE /api/comments/:id
```

### Autenticação

JWT obrigatório

### Respostas

#### 200 OK

```json
{
  "message": "Comentário removido com sucesso!"
}
```

#### 403 Forbidden

```json
{
  "message": "Você não possui permissão para remover este comentário"
}
```

---

# 📌 Observações Finais

* Todos os identificadores utilizam UUID.
* Artigos removidos utilizam Soft Delete através do campo `deletedAt`.
* Slugs são gerados automaticamente a partir do título do artigo.
* O campo `likedByMe` só é calculado quando um token JWT válido é enviado na requisição.
* Apenas o proprietário do conteúdo pode editar ou remover seus artigos e comentários.
* O status dos artigos pode ser:

  * `DRAFT`
  * `PUBLISHED`
