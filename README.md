# Plataforma de Blog

> Lembrete: Decidir nome definitivo do projeto!!

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)

---

## Sobre o projeto

**Plataforma de Blog** é uma plataforma de publicação de blogs com foco em simplicidade e experiência do usuário. Usuários podem criar uma conta, publicar posts, editar e deletar seu próprio conteúdo, comentar em posts de outros autores e expressar sua opinião com curtidas.

O projeto foi desenvolvido como trabalho acadêmico da disciplina de Desenvolvimento Web, aplicando conceitos de arquitetura REST, autenticação com JWT e modelagem relacional de dados.

---

## Funcionalidades

- **Autenticação segura** — cadastro, login e logout com JWT
- **Publicação de posts** — crie, edite e delete seus próprios posts com suporte a rascunho e publicado
- **Comentários** — comente em qualquer post e gerencie seus comentários
- **Curtidas** — curta e descurta posts (toggle, sem duplicatas)
- **Perfil público** — veja os posts publicados de qualquer autor
- **Proteção de rotas** — áreas de edição acessíveis apenas a usuários autenticados

---

## Stack tecnológica

### Frontend
| Tecnologia | Uso |
|---|---|
| React + TypeScript | Interface e tipagem |
| Vite | Bundler e dev server |
| Axios | Chamadas HTTP |
| Tailwind CSS | Estilização |

### Backend
| Tecnologia | Uso |
|---|---|
| Node.js + Express + TypeScript | Servidor e API REST |
| Prisma ORM | Acesso ao banco e migrations |
| PostgreSQL | Banco de dados relacional |
| JWT (jsonwebtoken) | Autenticação stateless |

---

## Autor

**João Paulo Santos**

- LinkedIn: [João Paulo Santos](https://www.linkedin.com/in/joaosantos02/)
- Email: jopaulo.as8@gmail.com
- GitHub: [@jopaul0](https://github.com/jopaul0)

Desenvolvido como projeto acadêmico — qualquer dúvida, abra uma issue ou entre em contato.