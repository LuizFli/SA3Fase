# Configuração de Perfil do Usuário

## Funcionalidades Implementadas

### 1. **Página de Configuração de Perfil**

A página de configuração de perfil permite ao usuário:

- **Alterar foto do perfil**: Upload de imagem que será exibida em todas as páginas
- **Editar nome**: Alterar o nome de exibição do usuário
- **Editar email**: Atualizar o endereço de email
- **Alterar senha**: Mudança segura da senha com validação

### 2. **Atualizações no Backend**

#### Modelo User atualizado:
- Novos campos: `email`, `avatar`, `updated_at`
- Métodos para atualizar perfil e senha
- Validações de segurança

#### Controller UserController:
- `GET /api/users/:id` - Obter dados do perfil
- `PUT /api/users/:id/profile` - Atualizar perfil (nome, email, avatar)
- `PUT /api/users/:id/password` - Alterar senha

### 3. **Atualizações no Frontend**

#### Componente PerfilConfig:
- Interface responsiva com Material-UI
- Upload de imagem com preview
- Formulários separados para perfil e senha
- Feedback visual com snackbars

#### Avatar dinâmico:
- Todas as páginas agora exibem o avatar do usuário logado
- Fallback para imagem padrão se não houver avatar personalizado

## Como Usar

### 1. **Acessar Configurações**
- Navegue até a página "Configurações"
- Clique na aba "Perfil"

### 2. **Alterar Foto do Perfil**
- Clique no ícone da câmera sobre o avatar
- Selecione uma imagem do seu computador
- A imagem será automaticamente redimensionada e aplicada

### 3. **Editar Informações Pessoais**
- Altere os campos "Nome Completo" e "Email"
- Clique em "Salvar Alterações"

### 4. **Alterar Senha**
- Clique no botão "Alterar Senha"
- Digite a senha atual e a nova senha
- Confirme a nova senha
- Clique em "Alterar Senha"

## Configuração do Banco de Dados

### Executar script SQL:
```sql
-- Adicionar colunas necessárias
ALTER TABLE users ADD COLUMN email VARCHAR(255);
ALTER TABLE users ADD COLUMN avatar TEXT;
ALTER TABLE users ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Atualizar dados existentes
UPDATE users 
SET email = COALESCE(email, username || '@empresa.com'),
    avatar = COALESCE(avatar, '/Imagens/Adm.png'),
    updated_at = COALESCE(updated_at, CURRENT_TIMESTAMP)
WHERE email IS NULL OR avatar IS NULL OR updated_at IS NULL;
```

### Inicialização Automática:
O servidor agora executa automaticamente a inicialização do banco de dados quando iniciado.

## Estrutura de Arquivos

### Backend:
- `models/User.js` - Modelo atualizado com novos campos
- `controllers/UserController.js` - Controller para operações de usuário
- `initDatabase.js` - Script de inicialização do banco
- `database_update.sql` - Script SQL manual

### Frontend:
- `components/PerfilConfig.jsx` - Página de configuração de perfil
- `api/usuariosApi.js` - API para operações de usuário
- `contexts/AuthContext.jsx` - Context atualizado com novos campos

## Validações e Segurança

### Validações implementadas:
- Nome e email obrigatórios
- Senha atual deve ser verificada antes de alterar
- Nova senha deve ter pelo menos 6 caracteres
- Confirmação de senha deve coincidir

### Segurança:
- Senhas não são expostas nas respostas da API
- Verificação da senha atual antes de permitir alteração
- Sanitização de dados de entrada

## Próximas Melhorias

- [ ] Implementar hash de senhas com bcrypt
- [ ] Validação de formato de email
- [ ] Limite de tamanho para upload de imagem
- [ ] Histórico de alterações do perfil
- [ ] Recuperação de senha por email
