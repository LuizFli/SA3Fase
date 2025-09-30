# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho no container
WORKDIR /app

# Copia o package.json e package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código da aplicação
COPY . .

# Faz o build da aplicação para produção
RUN npm run build

# Expõe a porta 80
EXPOSE 80

# Inicia o servidor preview do Vite (com proxy configurado)
CMD ["npm", "run", "preview"]