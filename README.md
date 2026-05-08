# CCO API

Uma API RESTful construída com AdonisJS para gerenciar operações relacionadas ao Centro de Controle de Operações (CCO), incluindo alunos, aeronaves, missões, slots e restrições.

## Descrição

A CCO API fornece endpoints para autenticação de usuários, gerenciamento de perfis e estrutura de dados para alunos, aeronaves, missões e slots de voo. É projetada para ser uma API moderna, type-safe, utilizando AdonisJS 7.x.

## Funcionalidades

- **Autenticação**: Login e logout com tokens de acesso
- **Gerenciamento de Usuários**: Cadastro e perfil de usuários
- **Estrutura de Dados**: Modelos para alunos, aeronaves, missões, slots e restrições
- **Banco de Dados**: SQLite com migrações Lucid ORM
- **Validação**: VineJS para validação de dados
- **Segurança**: CORS, Shield middleware
- **Type Safety**: TypeScript com Tuyau para chamadas API type-safe

## Estrutura da API

### Controllers
- `AccessTokensController`: Gerencia login e logout
- `NewAccountController`: Gerencia cadastro de novos usuários
- `ProfileController`: Exibe perfil do usuário autenticado

### Models
- `User`: Usuários do sistema
- `Aluno`: Alunos
- `Aeronave`: Aeronaves
- `Curso`: Cursos
- `Inva`: Instrutores de Voo (INVA)
- `Missao`: Missões
- `ModeloAeronave`: Modelos de aeronaves
- `Restricao`: Restrições
- `SituacaoInva`: Situações de INVA
- `Slot`: Slots de voo
- `StatusSlot`: Status dos slots

### Middleware
- `AuthMiddleware`: Autenticação obrigatória
- `ContainerBindingsMiddleware`: Bindings de container
- `ForceJsonResponseMiddleware`: Força resposta JSON
- `SilentAuthMiddleware`: Autenticação silenciosa

## Rotas

Todas as rotas estão prefixadas com `/api/v1` e requerem autenticação (exceto auth).

### Autenticação
- `POST /api/v1/auth/signup`: Cadastrar novo usuário
- `POST /api/v1/auth/login`: Fazer login
- `GET /api/v1/account/profile`: Obter perfil (requer autenticação)
- `POST /api/v1/account/logout`: Fazer logout (requer autenticação)

### CRUD Endpoints (requer autenticação)

#### Usuários
- `GET /api/v1/users`: Listar usuários
- `GET /api/v1/users/:id`: Obter usuário por ID
- `POST /api/v1/users`: Criar usuário
- `PUT /api/v1/users/:id`: Atualizar usuário
- `DELETE /api/v1/users/:id`: Deletar usuário

#### Situações INVA
- `GET /api/v1/situacao-invas`: Listar situações
- `GET /api/v1/situacao-invas/:id`: Obter situação por ID
- `POST /api/v1/situacao-invas`: Criar situação
- `PUT /api/v1/situacao-invas/:id`: Atualizar situação
- `DELETE /api/v1/situacao-invas/:id`: Deletar situação

#### Modelos de Aeronaves
- `GET /api/v1/modelo-aeronaves`: Listar modelos
- `GET /api/v1/modelo-aeronaves/:id`: Obter modelo por ID
- `POST /api/v1/modelo-aeronaves`: Criar modelo
- `PUT /api/v1/modelo-aeronaves/:id`: Atualizar modelo
- `DELETE /api/v1/modelo-aeronaves/:id`: Deletar modelo

#### Bases
- `GET /api/v1/bases`: Listar bases
- `GET /api/v1/bases/:id`: Obter base por ID
- `POST /api/v1/bases`: Criar base
- `PUT /api/v1/bases/:id`: Atualizar base
- `DELETE /api/v1/bases/:id`: Deletar base

#### Status de Slots
- `GET /api/v1/status-slots`: Listar status
- `GET /api/v1/status-slots/:id`: Obter status por ID
- `POST /api/v1/status-slots`: Criar status
- `PUT /api/v1/status-slots/:id`: Atualizar status
- `DELETE /api/v1/status-slots/:id`: Deletar status

#### Cursos
- `GET /api/v1/cursos`: Listar cursos
- `GET /api/v1/cursos/:id`: Obter curso por ID
- `POST /api/v1/cursos`: Criar curso
- `PUT /api/v1/cursos/:id`: Atualizar curso
- `DELETE /api/v1/cursos/:id`: Deletar curso

#### Aeronaves
- `GET /api/v1/aeronaves`: Listar aeronaves
- `GET /api/v1/aeronaves/:id`: Obter aeronave por ID
- `POST /api/v1/aeronaves`: Criar aeronave
- `PUT /api/v1/aeronaves/:id`: Atualizar aeronave
- `DELETE /api/v1/aeronaves/:id`: Deletar aeronave

#### Missões
- `GET /api/v1/missoes`: Listar missões
- `GET /api/v1/missoes/:id`: Obter missão por ID
- `POST /api/v1/missoes`: Criar missão
- `PUT /api/v1/missoes/:id`: Atualizar missão
- `DELETE /api/v1/missoes/:id`: Deletar missão

#### INVA
- `GET /api/v1/invas`: Listar invas
- `GET /api/v1/invas/:id`: Obter inva por ID
- `POST /api/v1/invas`: Criar inva
- `PUT /api/v1/invas/:id`: Atualizar inva
- `DELETE /api/v1/invas/:id`: Deletar inva

#### Alunos
- `GET /api/v1/alunos`: Listar alunos
- `GET /api/v1/alunos/:id`: Obter aluno por ID
- `POST /api/v1/alunos`: Criar aluno
- `PUT /api/v1/alunos/:id`: Atualizar aluno
- `DELETE /api/v1/alunos/:id`: Deletar aluno

#### Restrições
- `GET /api/v1/restricoes`: Listar restrições
- `GET /api/v1/restricoes/:id`: Obter restrição por ID
- `POST /api/v1/restricoes`: Criar restrição
- `PUT /api/v1/restricoes/:id`: Atualizar restrição
- `DELETE /api/v1/restricoes/:id`: Deletar restrição

#### Slots
- `GET /api/v1/slots`: Listar slots
- `GET /api/v1/slots/:id`: Obter slot por ID
- `POST /api/v1/slots`: Criar slot
- `PUT /api/v1/slots/:id`: Atualizar slot
- `DELETE /api/v1/slots/:id`: Deletar slot

#### Barras
- `GET /api/v1/barras`: Listar barras
- `GET /api/v1/barras/:id`: Obter barra por ID
- `POST /api/v1/barras`: Criar barra
- `PUT /api/v1/barras/:id`: Atualizar barra
- `DELETE /api/v1/barras/:id`: Deletar barra

### Resposta Básica
- `GET /`: Retorna `{ "hello": "world" }`

## Estrutura do Banco de Dados

O banco de dados utiliza SQLite e inclui as seguintes tabelas:

### users
- `id` (integer, primary key)
- `full_name` (string, nullable)
- `email` (string, unique, not null)
- `password` (string, not null)
- `created_at` (timestamp)
- `updated_at` (timestamp, nullable)

### auth_access_tokens
- `id` (integer, primary key)
- `tokenable_id` (integer, foreign key to users)
- `type` (string)
- `name` (string, nullable)
- `hash` (string)
- `abilities` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `last_used_at` (timestamp, nullable)
- `expires_at` (timestamp, nullable)

### situacoes_inva
- `id` (integer, primary key)
- `nome` (string, not null)
- `created_at` (timestamp)
- `updated_at` (timestamp, nullable)

### alunos
- `id` (integer, primary key)
- `nome` (string, not null)
- `cpf` (string, unique, not null)
- `celular` (string, not null)
- `created_at` (timestamp)
- `updated_at` (timestamp, nullable)

### modelos_aeronave
- `id` (integer, primary key)
- `nome` (string, not null)
- `created_at` (timestamp)
- `updated_at` (timestamp, nullable)

### cursos
- `id` (integer, primary key)
- `nome` (string, not null)
- `created_at` (timestamp)
- `updated_at` (timestamp, nullable)

### status_slots
- `id` (integer, primary key)
- `nome` (string, not null)
- `created_at` (timestamp)
- `updated_at` (timestamp, nullable)

### invas
- `id` (integer, primary key)
- `nome` (string, not null)
- `celular` (string, not null)
- `situacao_inva_id` (integer, foreign key to situacoes_inva)
- `created_at` (timestamp)
- `updated_at` (timestamp, nullable)

### missoes
- `id` (integer, primary key)
- `nome` (string, not null)
- `curso_id` (integer, foreign key to cursos)
- `created_at` (timestamp)
- `updated_at` (timestamp, nullable)

### aeronaves
- `id` (integer, primary key)
- `nome` (string, not null)
- `modelo_aeronave_id` (integer, foreign key to modelos_aeronave)
- `created_at` (timestamp)
- `updated_at` (timestamp, nullable)

### slots
- `id` (integer, primary key)
- `status_slot_id` (integer, foreign key to status_slots)
- `aeronave_id` (integer, foreign key to aeronaves)
- `aluno_id` (integer, foreign key to alunos)
- `missao_id` (integer, foreign key to missoes)
- `data_hora` (datetime, nullable)
- `created_at` (timestamp)
- `updated_at` (timestamp, nullable)

### restricoes
- `id` (integer, primary key)
- `inva_id` (integer, nullable, foreign key to invas)
- `aeronave_id` (integer, nullable, foreign key to aeronaves)
- `modelo_aeronave_id` (integer, nullable, foreign key to modelos_aeronave)
- `aluno_id` (integer, nullable, foreign key to alunos)
- `missao_id` (integer, nullable, foreign key to missoes)
- `observacao` (text, nullable)
- `is_inva` (boolean, default false)
- `is_aluno` (boolean, default false)
- `is_aluno_inva` (boolean, default false)
- `is_modelo` (boolean, default false)
- `is_aeronave` (boolean, default false)
- `is_missao` (boolean, default false)
- `created_at` (timestamp)
- `updated_at` (timestamp, nullable)

### barras
- `id` (integer, primary key)
- `nome` (string, not null)
- `modelo_aeronave_id` (integer, foreign key to modelos_aeronave)
- `created_at` (timestamp)
- `updated_at` (timestamp, nullable)

## Modo de Uso

### Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente (se necessário, copie `.env.example` para `.env`)

4. Execute as migrações do banco de dados:
   ```bash
   node ace migration:run
   ```

5. Execute o seeder para popular o banco com dados iniciais:
   ```bash
   node ace db:seed
   ```

### Executando a API

- **Desenvolvimento**:
  ```bash
  npm run dev
  ```

- **Produção**:
  ```bash
  npm run build
  npm start
  ```

### Testes

```bash
npm test
```

### Lint e Formatação

```bash
npm run lint
npm run format
```

### Type Checking

```bash
npm run typecheck
```

## Seeder

O projeto inclui um seeder (`CcoSeeder`) que popula o banco de dados com dados iniciais, incluindo usuários, situações INVA, modelos de aeronaves, bases, status de slots, cursos, aeronaves, missões e invas. O seeder usa `updateOrCreate` para evitar duplicatas.

Para executar o seeder:
```bash
node ace db:seed
```

Os dados incluem:
- 2 usuários administrativos: pedro.capellato@voesafe.com.br e cco@voesafe.com.br (senha: Safe1234%)
- 4 situações INVA
- 5 modelos de aeronaves
- 2 bases (SJK, CPQ)
- 6 status de slots
- 3 cursos
- 7 aeronaves
- 55 missões (todas do curso "PPA - Pratico")
- 34 invas com situações e bases associadas

## Tecnologias Utilizadas

- **Backend**: AdonisJS 7.x
- **Banco de Dados**: SQLite com Lucid ORM
- **Autenticação**: API Tokens
- **Validação**: VineJS
- **Type Safety**: TypeScript, Tuyau
- **Testes**: Japa
- **Linting**: ESLint
- **Formatação**: Prettier

## Contribuição

Para contribuir, siga os padrões do projeto e execute os testes antes de submeter pull requests.

# Generate application key
node ace generate:key

# Run database migrations
node ace migration:run

# Run the development server with hot reload
npm run dev
```

### Useful Commands

```bash
# Run tests
npm run test

# Type check
npm run typecheck

# Lint your code
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

Your API will be running at `http://localhost:3333`

### Available Endpoints

- `POST /api/v1/auth/signup` - Create a new account
- `POST /api/v1/auth/login` - Login and get access token
- `POST /api/v1/auth/logout` - Logout (requires authentication)
- `GET /api/v1/account/profile` - Get current user profile (requires authentication)

---

## 📚 Learn More

<table>
  <tr>
    <td>
      <a href="https://docs.adonisjs.com"><strong>📖 AdonisJS Docs</strong></a>
      <br>
      <span>Complete guide to AdonisJS</span>
    </td>
    <td>
      <a href="https://tuyau.dev"><strong>🔒 Tuyau</strong></a>
      <br>
      <span>Type-safe API calls</span>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://lucid.adonisjs.com"><strong>💾 Lucid ORM</strong></a>
      <br>
      <span>Database queries and relationships</span>
    </td>
    <td>
      <a href="https://vinejs.dev"><strong>✅ VineJS</strong></a>
      <br>
      <span>Schema validation guide</span>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://docs.adonisjs.com/guides/authentication/introduction"><strong>🔐 Authentication Guide</strong></a>
      <br>
      <span>Sessions and access tokens in AdonisJS</span>
    </td>
    <td>
      <a href="https://docs.adonisjs.com/guides/security/cors"><strong>🌐 CORS Guide</strong></a>
      <br>
      <span>Configure CORS for your API</span>
    </td>
  </tr>
</table>
