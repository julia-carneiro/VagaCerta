# Aplicativo de Vagas - VagaCerta

Este é um aplicativo mobile para ficar por dentro de vagas de emprego. Ele permite que usuários visualizem vagas e informações pessoais, que são armazenadas em um banco de dados conectado à API.

## 🛠️ Funcionalidades

- **Cadastro de usuários**: Usuários podem se cadastrar para acessar funcionalidades do app.
- **Edicão de usuários**: Usuários podem editar suas informações na aba de perfil do app.
- **Cadastro de vagas**: É possível cadastrar vagas através do POSTMAN utilizando o endpoint /vagas
- **Visualizar de vagas**: É possível visualizar vagas cadastradas no aplicativo.
- **Integração com Whatsapp**: Em vagas abertas, o usuário pode enviar uma mensagem pelo Whatsapp ao clicar no botão de "Entrar em contato"
- **Autenticação**: Apenas usuários autenticados têm acesso às funcionalidades principais.
- **Gerenciamento de perfil**: Usuários podem visualizar e editar suas informações pessoais.
- **Armazenamento local de dados**: Os dados de um usuário ficam armazenados localmente até ele fazer o logout.
---

## 🚀 Como Executar

### 1. Clonar o repositório

### 2. Backend

#### Pré-requisitos:

- Node.js 18+
- PostgreSQL
- Sequelize CLI configurado

#### Configuração:

1. Instale as dependências:
   ```bash
   yarn install
   ```
2. Inicie o servidor:
   ```bash
   yarn start
   ```

#### Endpoints:

Para interagir com a API, utilize o **Postman** ou outro cliente HTTP.

**Cadastro de vaga**  
Endpoint: `POST http://localhost:3000/vagas`  
Exemplo de requisição:  
```json
{
  "titulo": "Desenvolvedor Front-end",
  "descricao": "Desenvolvimento de interfaces web utilizando React.",
  "dataCadastro": "2024-06-30",
  "telefone": "1234-5678",
  "status": "aberta",
  "empresa": "Tech Solutions"
}
```

**Edição de vaga**  
Endpoint: `POST http://localhost:3000/vagas/{ID DA VAGA QUE DESEJA ALTERAR}`  
Exemplo de requisição:  
```json
{
  "titulo": "Nova vaga",
  "descricao": "Desenvolvimento de interfaces web utilizando React.",
  "dataCadastro": "2024-06-30",
  "telefone": "1234-5678",
  "status": "fechada",
  "empresa": "Tech Solutions"
}
```

**Cadastro de usuário**  
Endpoint: `POST http://localhost:3000/usuarios`  
- Essa funcionalidade também pode ser acessada diretamente pelo aplicativo com a criação de uma conta nova.
Exemplo de requisição:  
```json
{
  "nome": "Carlos Pereira",
  "email": "carlos.pereira@example.com",
  "senha": "senha789"
}
```

**Edição de usuário**  
Endpoint: `POST http://localhost:3000/usuario/{ID DO USUARIO QUE DESEJA ALTERAR}`  
Exemplo de requisição:  
```json
{
  "nome": "Carlos Pereira",
  "email": "novoemail@example.com",
  "senha": "senha789"
}
```

**Nota:** 
- Todas as requisições devem ser feitas individualmente.
- Não é necessário enviar o id pois ele é definido pelo próprio backend.

### 3. Mobile

#### Pré-requisitos:

- Expo 
- Ambiente configurado com emulador Android/iOS ou dispositivo físico.

#### Configuração:

1. Instale as dependências:
   ```bash
   yarn install
   ```
2. Inicie o servidor Expo:
   ```bash
   yarn start
   ```
3. Escaneie o QR Code exibido no terminal para abrir o app no dispositivo.

---

## 🏗️ Estrutura do Projeto

### **Frontend (Mobile)**

- **`App.tsx`**: Configura a navegação do aplicativo e autenticação de usuários.
- **`screens`**: Contém telas como Login, Formulário, Lista de Vagas e Perfil.
- **`context/AuthContext.tsx`**: Gerencia autenticação, persistência e logout de usuários.

### **Backend (API)**

- **`models/`**: Contém definições das tabelas `User` e `Vaga`.
- **`controllers/`**: Implementa as operações de CRUD para usuários e vagas.
- **`server.js`**: Define as rotas para endpoints de usuários e vagas.

---

## 🔐 Autenticação

- A autenticação no app é feita por meio do contexto `AuthContext` e utiliza `AsyncStorage` para persistir dados localmente.
- No backend, as senhas são armazenadas com `bcrypt` para segurança.

---

### Segurança das Senhas

As senhas dos usuários são protegidas utilizando o algoritmo **bcrypt**, que aplica hashing com salt para garantir a segurança dos dados. Esse método impede o armazenamento de senhas em texto puro no banco de dados, protegendo contra vazamentos e ataques de força bruta.

## 📚 Tecnologias Utilizadas

### Frontend
- **React Native**
- **Expo**
- **React Navigation**
- **Styled Components**

### Backend
- **Node.js**
- **Express**
- **Sequelize**

---

## 💡 Melhorias Futuras

- Implementar buscas e filtros de vagas no frontend.
- Adicionar notificações push para novas vagas.
- Refatorar a UI/UX do aplicativo.
- Criar um perfil para Administrador/empresa - permitindo adicionar vagas diretamente no app.

---
