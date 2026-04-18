# Backlog do produto

> O projeto será entregue em duas sprints. Cada sprint cobre funcionalidades completas, do backend ao frontend.

---

## Backlog geral

| Rank | User Story | Prioridade | Sprint |
|:----:|-----------|:----------:|:------:|
| 01 | Como usuário, quero me cadastrar com nome, e-mail e senha, para que eu possa ter uma conta e acessar as funcionalidades da plataforma | Alta | 1 |
| 02 | Como usuário, quero fazer login com e-mail e senha, para que eu possa acessar minha conta e área privada | Alta | 1 |
| 03 | Como usuário, quero que rotas privadas me redirecionem para login se não estiver autenticado, para que meu conteúdo fique protegido | Alta | 1 |
| 04 | Como usuário, quero fazer logout, para que eu possa encerrar minha sessão com segurança | Alta | 1 |
| 05 | Como visitante, quero ver a lista de posts publicados na home, para que eu descubra novos conteúdos e autores | Alta | 1 |
| 06 | Como visitante, quero ver o conteúdo completo de um post, para que eu possa ler o artigo por inteiro | Alta | 1 |
| 07 | Como usuário autenticado, quero criar um novo post, para que eu possa compartilhar minhas ideias na plataforma | Alta | 1 |
| 08 | Como usuário autenticado, quero editar meus próprios posts, para que eu possa corrigir ou atualizar o conteúdo publicado | Alta | 1 |
| 09 | Como usuário autenticado, quero deletar meus próprios posts, para que eu possa remover conteúdo que não quero mais publicar | Alta | 1 |
| 10 | Como usuário autenticado, quero ver um dashboard com meus posts, para que eu tenha controle sobre tudo que já publiquei ou deixei em rascunho | Alta | 1 |
| 11 | Como visitante, quero ver o perfil público de um autor com seus posts publicados, para que eu possa conhecer melhor quem escreveu o conteúdo | Média | 2 |
| 12 | Como usuário autenticado, quero comentar em um post, para que eu possa interagir e debater com outros autores | Média | 2 |
| 13 | Como visitante, quero ver os comentários de um post, para que eu possa acompanhar o debate em torno do tema | Média | 2 |
| 14 | Como usuário autenticado, quero deletar meus próprios comentários, para que eu possa remover algo que escrevi por engano | Baixa | 2 |
| 15 | Como usuário autenticado, quero ver meu perfil com meus dados e posts, para que eu possa acompanhar minha presença na plataforma | Baixa | 2 |
| 16 | Como usuário autenticado, quero curtir e descurtir um post, para que eu possa demonstrar apreciação pelo conteúdo | Baixa | 2 |
| 17 | Como visitante, quero ver a contagem de curtidas de um post, para que eu perceba quais conteúdos são mais relevantes para a comunidade | Baixa | 2 |

---

## Sprint 1

### Backlog da sprint

| Rank | User Story | Prioridade |
|:----:|-----------|:----------:|
| 01 | Como usuário, quero me cadastrar com nome, e-mail e senha, para que eu possa ter uma conta e acessar as funcionalidades da plataforma | Alta |
| 02 | Como usuário, quero fazer login com e-mail e senha, para que eu possa acessar minha conta e área privada | Alta |
| 03 | Como usuário, quero que rotas privadas me redirecionem para login se não estiver autenticado, para que meu conteúdo fique protegido | Alta |
| 04 | Como usuário, quero fazer logout, para que eu possa encerrar minha sessão com segurança | Alta |
| 05 | Como visitante, quero ver a lista de posts publicados na home, para que eu descubra novos conteúdos e autores | Alta |
| 06 | Como visitante, quero ver o conteúdo completo de um post, para que eu possa ler o artigo por inteiro | Alta |
| 07 | Como usuário autenticado, quero criar um novo post, para que eu possa compartilhar minhas ideias na plataforma | Alta |
| 08 | Como usuário autenticado, quero editar meus próprios posts, para que eu possa corrigir ou atualizar o conteúdo publicado | Alta |
| 09 | Como usuário autenticado, quero deletar meus próprios posts, para que eu possa remover conteúdo que não quero mais publicar | Alta |
| 10 | Como usuário autenticado, quero ver um dashboard com meus posts, para que eu tenha controle sobre tudo que já publiquei ou deixei em rascunho | Alta |

### Tasks da sprint

| ID | Descrição | Def. de pronto | Def. de feito | Estimativa |
|----|-----------|----------------|---------------|:----------:|
| 00-1 | Inicializar repositório com estrutura monorepo (`/frontend` e `/backend`), configurar `.gitignore` e `README.md` | Nenhum pré-requisito | Repositório criado e commitado com estrutura base | 30min |
| 00-2 | Configurar projeto React + TypeScript com Vite; instalar dependências (React Router, TanStack Query, Tailwind, Zod, React Hook Form, Axios) | 00-1 concluída | Frontend rodando em `localhost:5173` | 2h |
| 00-3 | Inicializar projeto Node.js + TypeScript no `/backend`; configurar `ts-node-dev` e Express | 00-1 concluída | Servidor respondendo em `localhost:3333` | 1h |
| 00-4 | Instalar dependências do backend: Prisma, `dotenv`, `zod`, `bcryptjs`, `jsonwebtoken` | 00-3 concluída | Todas as libs instaladas sem erros | 30min |
| 00-5 | Criar `docker-compose.yml` com serviço PostgreSQL e arquivo `.env` com `DATABASE_URL` | Docker instalado | `docker-compose up -d` sobe o banco sem erros | 1h |
| 00-6 | Escrever `schema.prisma` com entidades `User`, `Post`, `Comment`, `Like` e rodar `prisma migrate dev` | 00-5 concluída | Migration aplicada e tabelas criadas no banco | 2h |
| 00-7 | Criar middleware global de tratamento de erros e helper de resposta padronizada | 00-3 concluída | Erros retornam JSON com `{ message, status }` de forma consistente | 1h |
| 00-8 | Criar middleware `authMiddleware.ts` que valida Bearer token JWT e injeta usuário no `req` | 00-4 concluída | Rotas protegidas retornam 401 sem token válido | 2h |
| 00-9 | Criar estrutura de pastas do frontend: `pages/`, `components/`, `hooks/`, `services/`, `types/` | 00-2 concluída | Estrutura criada e commitada | 30min |
| 01-1 | Implementar `POST /auth/register` com validação Zod e hash de senha via `bcryptjs` | 00-6 e 00-8 concluídas | Usuário criado no banco; senha nunca retornada na resposta | 2h |
| 01-2 | Implementar página `RegisterPage` com formulário (nome, e-mail, senha) e validação Zod | 00-9 concluída | Formulário valida campos, exibe erros por campo e chama `POST /auth/register` | 2h |
| 02-1 | Implementar `POST /auth/login` retornando JWT assinado com expiração de 7 dias | 01-1 concluída | Credenciais inválidas retornam 401; token válido retornado no body | 1h |
| 02-2 | Criar `AuthContext` com estado de usuário, funções `login()` e `logout()` | 00-9 concluída | Contexto exportado e `AuthProvider` envolvendo a aplicação | 2h |
| 02-3 | Implementar página `LoginPage` com formulário (e-mail, senha), validação Zod e integração com `POST /auth/login` | 02-1 e 02-2 concluídas | Após login bem-sucedido, token salvo no `localStorage` e usuário redirecionado para `/` | 2h |
| 03-1 | Criar componente `PrivateRoute` que verifica `AuthContext` e redireciona para `/login` | 02-2 concluída | Rotas privadas inacessíveis sem autenticação; rotas públicas acessíveis normalmente | 1h |
| 03-2 | Configurar React Router com rotas públicas e privadas | 03-1 concluída | Rotas `/dashboard`, `/posts/new` e `/posts/:id/edit` protegidas; demais públicas | 2h |
| 04-1 | Criar componente `Header` com navegação condicional e botão de logout | 02-2 concluída | Header exibe links públicos sempre e botão de logout apenas quando autenticado | 2h |
| 04-2 | Conectar botão logout à função `logout()` do `AuthContext` | 04-1 concluída | Token removido do `localStorage`, contexto limpo e usuário redirecionado para `/login` | 30min |
| 05-1 | Implementar `GET /posts` retornando posts publicados ordenados por data decrescente | 00-6 concluída | Endpoint público; retorna array paginado de posts com dados do autor | 2h |
| 05-2 | Criar componente `PostCard` com título, autor, data e trecho do conteúdo | 00-9 concluída | Componente renderiza corretamente e linka para `/posts/:slug` | 2h |
| 05-3 | Implementar página `HomePage` consumindo `GET /posts` via TanStack Query em grid responsivo | 05-1 e 05-2 concluídas | Lista renderiza com dados reais e layout é responsivo em mobile e desktop | 2h |
| 06-1 | Implementar `GET /posts/:slug` retornando conteúdo completo do post com dados do autor | 00-6 concluída | Retorna 404 se slug não encontrado | 1h |
| 06-2 | Implementar página `PostDetailPage` consumindo `GET /posts/:slug` | 06-1 concluída | Página exibe conteúdo completo, autor e data; exibe mensagem de erro se não encontrado | 2h |
| 07-1 | Implementar `POST /posts` criando post com geração automática de slug único | 00-6 e 00-8 concluídas | Post criado no banco associado ao usuário autenticado; retorna 401 sem token | 2h |
| 07-2 | Criar página `NewPostPage` com formulário (título, conteúdo, status) integrado ao `POST /posts` | 07-1 e 03-2 concluídas | Formulário valida campos, envia para API e redireciona para `/dashboard` após criação | 2h |
| 08-1 | Implementar `PUT /posts/:id` com validação de ownership | 07-1 concluída | Retorna 403 se o usuário autenticado não for o autor do post | 2h |
| 08-2 | Criar página `EditPostPage` que pré-preenche formulário com dados do post e integra ao `PUT /posts/:id` | 08-1 e 03-2 concluídas | Formulário carrega dados reais do post; alterações salvas e usuário redirecionado para `/dashboard` | 2h |
| 09-1 | Implementar `DELETE /posts/:id` com validação de ownership | 07-1 concluída | Retorna 403 se não for o autor; cascade remove comentários e likes | 1h |
| 09-2 | Criar componente `ConfirmModal` reutilizável e integrar deleção no dashboard | 09-1 concluída | Modal exibe confirmação antes de deletar; post removido da lista após exclusão | 2h |
| 10-1 | Implementar `GET /users/me/posts` retornando todos os posts do usuário autenticado (incluindo rascunhos) | 00-6 e 00-8 concluídas | Endpoint protegido; retorna posts com status, data e contagens | 1h |
| 10-2 | Implementar página `DashboardPage` consumindo `GET /users/me/posts` | 10-1 e 03-2 concluídas | Lista todos os posts do usuário com badge de status e botões de editar e deletar | 2h |

---

## Sprint 2

### Backlog da sprint

| Rank | User Story | Prioridade |
|:----:|-----------|:----------:|
| 11 | Como visitante, quero ver o perfil público de um autor com seus posts publicados, para que eu possa conhecer melhor quem escreveu o conteúdo | Média |
| 12 | Como usuário autenticado, quero comentar em um post, para que eu possa interagir e debater com outros autores | Média |
| 13 | Como visitante, quero ver os comentários de um post, para que eu possa acompanhar o debate em torno do tema | Média |
| 14 | Como usuário autenticado, quero deletar meus próprios comentários, para que eu possa remover algo que escrevi por engano | Baixa |
| 15 | Como usuário autenticado, quero ver meu perfil com meus dados e posts, para que eu possa acompanhar minha presença na plataforma | Baixa |
| 16 | Como usuário autenticado, quero curtir e descurtir um post, para que eu possa demonstrar apreciação pelo conteúdo | Baixa |
| 17 | Como visitante, quero ver a contagem de curtidas de um post, para que eu perceba quais conteúdos são mais relevantes para a comunidade | Baixa |

### Tasks da sprint

| ID | Descrição | Def. de pronto | Def. de feito | Estimativa |
|----|-----------|----------------|---------------|:----------:|
| 11-1 | Implementar `GET /users/:id` retornando nome e posts publicados do usuário | 00-6 concluída | Endpoint público; retorna apenas posts com `status: "published"` | 1h |
| 11-2 | Criar página `PublicProfilePage` acessível em `/users/:id` consumindo `GET /users/:id` | 11-1 concluída | Página exibe nome do autor e seus posts publicados com link para cada um | 1h |
| 11-3 | Adicionar link para o perfil público do autor no `PostCard` e na `PostDetailPage` | 11-2 concluída | Clique no nome do autor navega para `/users/:id` | 30min |
| 12-1 | Implementar `POST /posts/:id/comments` com validação Zod | 00-6 e 00-8 concluídas | Comentário salvo no banco associado ao usuário e post; retorna 401 sem token | 1h |
| 12-2 | Criar componente `CommentForm` no frontend integrado ao `POST /posts/:id/comments` | 12-1 concluída | Formulário envia comentário e invalida a query da lista após submit bem-sucedido | 2h |
| 13-1 | Implementar `GET /posts/:id/comments` retornando comentários com dados do autor | 00-6 concluída | Endpoint público; array ordenado por data crescente | 1h |
| 13-2 | Criar componente `CommentList` consumindo `GET /posts/:id/comments` e exibir na `PostDetailPage` | 13-1 concluída | Lista de comentários exibida abaixo do conteúdo do post | 2h |
| 14-1 | Implementar `DELETE /comments/:id` com validação de ownership | 00-6 e 00-8 concluídas | Apenas o autor do comentário consegue deletar; retorna 403 caso contrário | 1h |
| 14-2 | Adicionar botão de deletar em cada comentário no frontend (visível apenas para o autor) | 14-1 e 13-2 concluídas | Comentário removido da lista após exclusão sem recarregar a página | 1h |
| 15-1 | Implementar `GET /users/me` retornando dados do usuário autenticado | 00-6 e 00-8 concluídas | Senha nunca retornada; endpoint protegido por `authMiddleware` | 1h |
| 15-2 | Criar página `ProfilePage` consumindo `GET /users/me` e `GET /users/me/posts` | 15-1 concluída | Página exibe nome, e-mail e lista de posts do usuário logado | 2h |
| 16-1 | Implementar `POST /posts/:id/likes` com toggle (cria se não existe, deleta se existe) | 00-6 e 00-8 concluídas | Constraint de unicidade impede duplicatas; retorna estado atual do like | 2h |
| 16-2 | Criar componente `LikeButton` com atualização otimista do estado | 16-1 concluída | Botão reflete o novo estado imediatamente; reverte em caso de erro na API | 2h |
| 17-1 | Incluir `_count.likes` e indicador `likedByMe` nas queries de posts do Prisma | 16-1 concluída | Contagem e estado do like retornados nos endpoints de listagem e detalhe | 1h |
| 17-2 | Exibir contagem de curtidas no `PostCard` e na `PostDetailPage` | 17-1 concluída | Número atualiza após toggle do like sem recarregar a página | 1h |