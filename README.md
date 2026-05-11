# SAFE CCO-API - Documentação Técnica

Este documento serve como a documentação oficial para a API do Centro de Controle Operacional (CCO) da SAFE Escola de Aviação Civil.

## 1. Visão Geral do Projeto

A **SAFE CCO-API** é o sistema de backend responsável por gerenciar o agendamento de voos, escalas de instrutores, disponibilidade de aeronaves e restrições operacionais da escola.

- **Stack Tecnológica:**
  - **Framework:** [AdonisJS 6](https://docs.adonisjs.com/6.x)
  - **ORM:** Lucid ORM
  - **Banco de Dados:** SQLite (Ambiente de Desenvolvimento)
  - **Linguagem:** TypeScript

## 2. Autenticação & Segurança

A API utiliza **Access Tokens** (OAT - Opaque Access Tokens) para autenticação.

- **Fluxo:** O usuário realiza o login e recebe um token que deve ser enviado em todas as requisições subsequentes no header `Authorization`.
- **Formato do Header:** `Authorization: Bearer <token>`
- **Proteção:** Todas as rotas operacionais estão protegidas pelo middleware `auth()` e agrupadas sob o prefixo `/api/v1`.

## 3. Arquitetura de Dados (Entidades)

O sistema é estruturado em torno das seguintes entidades principais:

| Entidade | Descrição | Relações Principais |
| :--- | :--- | :--- |
| **User** | Usuários do sistema e administradores. | - |
| **Inva** | Instrutores de voo. | `SituacaoInva`, `Base`, `Restricao`, `EscalaTrabalho` |
| **Aeronave** | Frota da escola. | `ModeloAeronave`, `Slot`, `Restricao` |
| **ModeloAeronave** | Categorias de aeronaves (MC01, COLT, etc). | `Aeronave`, `Barra`, `Restricao` |
| **Barra** | Trilhos de agendamento visual. | `ModeloAeronave`, `Base`, `Slot` |
| **Aluno** | Estudantes matriculados. | `Slot`, `Restricao` |
| **Missao** | Atividades de voo específicas. | `Curso`, `Slot`, `Restricao` |
| **Curso** | Programas de treinamento (PPA, PCA, etc). | `Missao` |
| **Slot** | Agendamentos de voo (os blocos de tempo). | `StatusSlot`, `Aeronave`, `Inva`, `Aluno`, `Missao`, `Barra` |
| **Restricao** | Bloqueios ou avisos operacionais. | `Inva`, `Aeronave`, `ModeloAeronave`, `Aluno`, `Missao` |
| **EscalaTrabalho** | Disponibilidade dos instrutores. | `Inva`, `TipoDisponibilidade` |

## 4. Padrões de Desenvolvimento

### Roteamento
- Utilizamos `router.resource` para criação automática de CRUDs padronizados.
- Todas as rotas de negócio estão versionadas em `/api/v1`.

### Respostas JSON & Performance
- **Eager Loading:** A API implementa o carregamento antecipado (`preload`) em múltiplos níveis para garantir que as respostas JSON contenham objetos relacionados completos (ex: Slot -> Aeronave -> ModeloAeronave), minimizando o número de requisições do frontend.

### Tratamento de Datas e Horas
- **Armazenamento:** Todas as datas são persistidas no banco de dados em **UTC**.
- **Entrada de Dados:** A API trata as strings de data/hora recebidas considerando o fuso horário `America/Sao_Paulo` antes da conversão para UTC.

## 5. Guia de Uso da API

### Autenticação (Login)

**Endpoint:** `POST /api/v1/auth/login`

**Requisição:**
```json
{
  "email": "usuario@voesafe.com.br",
  "password": "sua_senha_aqui"
}
```

**Resposta:**
```json
{
  "user": {
    "id": 1,
    "fullName": "Nome do Usuário",
    "email": "usuario@voesafe.com.br"
  },
  "token": "oat_MTU.em9..."
}
```

### Endpoints Disponíveis

| Verbo | Endpoint | Descrição |
| :--- | :--- | :--- |
| **POST** | `/api/v1/auth/signup` | Cadastro de novo usuário |
| **POST** | `/api/v1/auth/login` | Login e obtenção de token |
| **GET** | `/api/v1/account/profile` | Dados do usuário logado |
| **POST** | `/api/v1/account/logout` | Revogação do token atual |
| **RESOURCE** | `/api/v1/users` | CRUD de Usuários |
| **RESOURCE** | `/api/v1/invas` | CRUD de Instrutores |
| **RESOURCE** | `/api/v1/alunos` | CRUD de Alunos |
| **RESOURCE** | `/api/v1/aeronaves` | CRUD de Aeronaves |
| **RESOURCE** | `/api/v1/missoes` | CRUD de Missões |
| **RESOURCE** | `/api/v1/slots` | CRUD de Agendamentos (Slots) |
| **POST** | `/api/v1/slots/import` | Importação em lote de Slots |
| **RESOURCE** | `/api/v1/restricoes` | CRUD de Restrições |
| **POST** | `/api/v1/restricoes/import` | Importação em lote de Restrições |
| **RESOURCE** | `/api/v1/escala-trabalhos` | CRUD de Escalas |
| **POST** | `/api/v1/escala-trabalhos/import` | Importação em lote de Escalas |
| **RESOURCE** | `/api/v1/barras` | CRUD de Barras de Agendamento |

*Nota: Endpoints marcados como RESOURCE incluem as rotas padrão: index, show, store, update e destroy.*

## 6. Comandos Úteis

### Ambiente e Banco de Dados

Para resetar o banco de dados e aplicar todos os dados iniciais (Seeders):
```bash
node ace migration:fresh
node ace db:seed
```

### Desenvolvimento
```bash
# Iniciar servidor em modo desenvolvimento
npm run dev

# Executar verificações de tipo (TypeScript)
npm run typecheck

# Formatar o código
npm run format
```
