# SA3Fase - Dockerização Completa ✅

Este projeto contém dockerização completa para o front-end, back-end e banco de dados da aplicação SA3Fase.

## 🏗️ Estrutura dos Containers

- **Frontend**: React/Vite + Nginx (porta 8080)
- **Backend**: Node.js/Express API (porta 3000)  
- **Database**: PostgreSQL 15 (porta 5432)

## 🚀 Como executar

### ✅ Execução Completa (Recomendado)

1. **Certifique-se de ter o Docker Desktop instalado e rodando**
2. **Na raiz do projeto, execute:**

```bash
docker-compose up -d --build
```

3. **Acesse as aplicações:**
   - 🌐 **Frontend**: http://localhost:8080
   - 🔗 **Backend API**: http://localhost:3000
   - 🗃️ **PostgreSQL**: localhost:5432

4. **Para parar os containers:**
```bash
docker-compose down
```

### 🔄 Alternando entre Banco Local e Externo

**Banco LOCAL (Docker PostgreSQL):**
```powershell
.\switch-db.ps1 local
docker-compose up -d --build
```

**Banco EXTERNO (Render):**  
```powershell
.\switch-db.ps1 external
docker-compose up -d --build
```

### Opção 2: Executando containers individualmente

#### Backend
```bash
cd Back_end
docker build -t sa3fase-backend .
docker run -p 3000:3000 sa3fase-backend
```

#### Frontend
```bash
cd Front_end
docker build -t sa3fase-frontend .
docker run -p 80:80 sa3fase-frontend
```

## ⚙️ Configurações dos Containers

### 🗃️ PostgreSQL Database
- **Imagem**: `postgres:15-alpine`
- **Porta**: 5432
- **Database**: sales_sight
- **Usuário**: abilio
- **Inicialização**: Script SQL automático com dados de exemplo

### 🖥️ Backend (Node.js/Express)
- **Baseado**: `node:18-alpine`
- **Porta**: 3000
- **Conexão**: PostgreSQL local ou externo (configurável)
- **APIs**: Funcionários, Produtos, Vendas, Notificações
- **Health Check**: Teste automático de conexão com banco

### 🌐 Frontend (React/Vite + Nginx)
- **Build Multi-stage**:
  - Stage 1: Build React com Vite
  - Stage 2: Nginx para servir arquivos
- **Porta**: 8080 (alterada para evitar conflitos)
- **Proxy**: Configurado para `/api/` → backend:3000

### 🐳 Docker Compose
- **Rede isolada**: `sa3fase-network`
- **Dependências**: Backend aguarda PostgreSQL estar healthy
- **Volumes**: Persistência de dados do PostgreSQL
- **Restart**: Automático para todos os containers

## Variáveis de Ambiente

Para produção, você pode criar um arquivo `.env` na raiz do projeto com:

```env
NODE_ENV=production
PORT=3000
# Adicione outras variáveis conforme necessário
```

## Desenvolvimento

Para desenvolvimento, você pode usar volumes montados editando o docker-compose.yml:

```yaml
services:
  backend:
    volumes:
      - ./Back_end:/app
      - /app/node_modules
```

## Troubleshooting

1. **Porta já em uso**: Certifique-se de que as portas 80 e 3000 não estejam sendo usadas
2. **Problemas de build**: Execute `docker-compose down` e depois `docker-compose up --build --force-recreate`
3. **Logs dos containers**: Use `docker-compose logs [service-name]` para ver logs específicos

## Comandos Úteis

```bash
# Ver containers rodando
docker-compose ps

# Ver logs
docker-compose logs -f

# Rebuild específico
docker-compose build [service-name]

# Executar comando no container
docker-compose exec backend npm test
```