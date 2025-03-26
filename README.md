# Eagles Group LLC - CRM System

![Eagles Group Logo](./src/frontend/src/assets/images/eagles-logo.svg)

## Visão Geral

Este é um sistema CRM (Customer Relationship Management) desenvolvido para a Eagles Group LLC e suas empresas associadas (Brazilian Concrete LLC, Eagles Cleaning LLC). O sistema é projetado para gerenciar projetos de construção, materiais, finanças, clientes e equipes, seguindo a legislação americana.

## Tecnologias Utilizadas

- **Frontend**: React.js, Material-UI, Chart.js
- **Backend**: Node.js, Express
- **Banco de Dados**: Firebase (Firestore)
- **Autenticação**: Firebase Authentication
- **Armazenamento**: Firebase Storage

## Funcionalidades Implementadas

### Autenticação e Usuários
- Sistema de login e registro com Firebase Authentication
- Recuperação de senha
- Gerenciamento de perfil de usuário
- Níveis de acesso diferenciados (admin, gerente, usuário)

### Dashboard
- Visão geral das métricas principais
- Gráficos de desempenho e estatísticas
- Acesso rápido às principais funcionalidades

### Gestão de Clientes
- Listagem de clientes com filtros e busca
- Visualização detalhada de informações do cliente
- Adição e edição de clientes
- Histórico de interações e projetos associados

### Gestão de Projetos
- Listagem de projetos com estatísticas e filtros
- Visualização detalhada com progresso do projeto
- Gerenciamento de tarefas, equipe, materiais e documentos
- Formulário multi-etapas para adição de novos projetos
- Interface para edição de projetos existentes

### Gestão de Materiais
- Listagem de materiais com estatísticas e filtros
- Visualização detalhada de informações do material
- Formulário para adição de novos materiais
- Interface para edição de materiais existentes
- Histórico de movimentação de materiais

### Movimentação de Materiais
- Histórico completo de movimentações
- Filtros por tipo, data, material e projeto
- Registro de novas movimentações em lote
- Geração de relatórios e exportação de dados

### Gestão Financeira
- Listagem de transações com estatísticas e filtros
- Visualização detalhada de transações
- Formulário para adição de novas transações
- Interface para edição de transações existentes
- Gráficos de receitas e despesas

### Integração com Firebase
- Configuração completa do Firebase para autenticação
- Armazenamento de dados no Firestore
- Upload e gerenciamento de arquivos no Storage

## Funcionalidades Planejadas

### Fase 1 (Próxima Implementação)
- Integração completa com API real (substituição de dados simulados)
- Sistema de notificações em tempo real
- Exportação de relatórios em PDF e Excel
- Calendário de eventos e prazos

### Fase 2
- Aplicativo móvel para acesso em campo
- Integração com sistemas de pagamento
- Assinatura digital de documentos
- Módulo de orçamentos com aprovação do cliente

### Fase 3
- Integração com ferramentas de contabilidade
- Sistema de tickets de suporte
- Análise avançada de dados e previsões
- Integração com ferramentas de marketing

## Estrutura do Projeto

```
CRM construtora/
├── src/
│   ├── frontend/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── assets/
│   │   │   ├── components/
│   │   │   ├── context/
│   │   │   ├── firebase/
│   │   │   ├── hooks/
│   │   │   ├── pages/
│   │   │   │   ├── auth/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── landing/
│   │   │   ├── utils/
│   │   │   ├── App.js
│   │   │   ├── index.js
│   ├── backend/ (Planejado para implementação futura)
```

## Configuração e Instalação

### Pré-requisitos
- Node.js (v14 ou superior)
- npm ou yarn

### Instalação
1. Clone o repositório:
   ```
   git clone https://github.com/Samoo1234/eaglesgroup.git
   ```

2. Instale as dependências do frontend:
   ```
   cd eaglesgroup/src/frontend
   npm install
   ```

3. Configure as variáveis de ambiente (crie um arquivo .env na pasta frontend):
   ```
   REACT_APP_FIREBASE_API_KEY=seu_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=seu_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=seu_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=seu_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=seu_measurement_id
   ```

4. Inicie o servidor de desenvolvimento:
   ```
   npm start
   ```

## Contribuição

Este projeto está sendo desenvolvido para a Eagles Group LLC. Contribuições devem ser discutidas com a equipe de desenvolvimento.

## Licença

Todos os direitos reservados à Eagles Group LLC.
