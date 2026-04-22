# 🎨 Frontend - Seboso

Interface do sistema **Seboso**, responsável pela experiência do usuário e integração com a API.

---

# 🧠 Objetivo

Construir uma interface moderna para:

* Visualização de sebos e livros
* Gestão de acervo (donos)
* Administração da plataforma (admins)
* Navegação rápida e intuitiva

---

# ⚙️ Tecnologias

* React + TypeScript
* TailwindCSS
* React Router

---

# 🧱 Estrutura do Projeto

```
src/
 ├── components/   → componentes reutilizáveis (Header, Sidebar, Cards)
 ├── pages/        → páginas (Home, Livros, About, etc)
 ├── routes/       → configuração de rotas
 └── services/     → comunicação com API
```

---

# 🚀 O que já foi feito

## 🔹 Base do projeto

* Setup com Vite + React + TS
* Integração com TailwindCSS
* Estrutura inicial de pastas

---

## 🔹 Navegação

* Implementação do React Router
* Rotas principais:

  * `/` → Home
  * `/books` → Livros
  * `/about` → About

---

## 🔹 Header

* Logo + identidade visual
* Navbar com navegação
* Componentização (Head + NavBar)

---

## 🔹 Páginas iniciais

* Home
* Livros
* About

---

# 🧩 O que ainda deve ser feito

## 🏠 Home (cliente)

* Listar sebos (GET `/store`)
* Adicionar busca
* Adicionar filtros
* Melhorar UI dos cards

---

## 🏪 Página de Sebo

* Listar livros do sebo (GET `/catalog/:store`)
* Navegação para detalhes

---

## 📖 Catálogo Geral

* Listar todos os livros (GET `/books`)
* Busca global

---

## 📘 Detalhes do Livro

* Exibir informações completas
* Mostrar sebos disponíveis
* Mostrar localização no sebo

---

## 👤 Sistema de Usuários

* Login / autenticação
* Controle de tipo de usuário
* Rotas protegidas

---

## 🏪 Área do Dono

* CRUD de livros
* Organização por localização
* Gestão de funcionários

---

## 🛠️ Área Admin

* Dashboard com métricas
* Gestão de usuários
* Gestão de sebos
* Logs e relatórios

---

# 🔗 Integração com Backend

| Funcionalidade   | Endpoint          |
| ---------------- | ----------------- |
| Listar sebos     | `/store`          |
| Listar livros    | `/books`          |
| Catálogo de sebo | `/catalog/:store` |
| Criar usuário    | `/users`          |

---

# 🔐 Controle de Acesso

O backend define o tipo de usuário:

```json
{
  "tipo": "admin"
}
```

O frontend deve:

* mostrar/esconder páginas
* adaptar menus
* proteger rotas

---

# 🧠 Padrões do Projeto

* Componentização
* Separação de responsabilidades
* SPA (sem reload)
* Tailwind para estilização

---

# 🚀 Como rodar

```bash
npm install
npm run dev
```

---

# 📌 Kanban (Próximas Ações)

## 🟡 A Fazer

* [ ] Criar página de Sebo
* [ ] Criar página de detalhes do livro
* [ ] Implementar catálogo geral
* [ ] Criar sistema de login
* [ ] Implementar controle de usuário (roles)

---

## 🔵 Em Progresso

---

## 🟢 Concluído

* [x] Implementar cards de sebos
* [x] Criar layout completo da Home (sidebar + lista)
* [x] Setup do projeto
* [x] Integração Tailwind
* [x] Configuração de rotas
* [x] Header + NavBar
* [x] Páginas iniciais

---

# 📄 Status

🚧 Em desenvolvimento
